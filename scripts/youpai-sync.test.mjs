import assert from "node:assert/strict";
import test from "node:test";

import {
  keychainServices,
  readKeychainCredential,
  resolveCredentials,
} from "./youpai-sync.mjs";

test("environment variables take priority without reading Keychain", () => {
  let reads = 0;
  const credentials = resolveCredentials(
    { UPYUN_OPERATOR: "env-operator", UPYUN_PASSWORD: "env-password" },
    {
      platform: "darwin",
      readCredential: () => {
        reads += 1;
        return "keychain-value";
      },
    },
  );

  assert.deepEqual(credentials, {
    operator: "env-operator",
    password: "env-password",
  });
  assert.equal(reads, 0);
});

test("only a missing password falls back to its Keychain service", () => {
  const services = [];
  const credentials = resolveCredentials(
    { UPYUN_OPERATOR: "env-operator" },
    {
      platform: "darwin",
      readCredential: (serviceName) => {
        services.push(serviceName);
        return "keychain-password";
      },
    },
  );

  assert.deepEqual(credentials, {
    operator: "env-operator",
    password: "keychain-password",
  });
  assert.deepEqual(services, [keychainServices.password]);
});

test("only a missing operator falls back to its Keychain service", () => {
  const services = [];
  const credentials = resolveCredentials(
    { UPYUN_PASSWORD: "env-password" },
    {
      platform: "darwin",
      readCredential: (serviceName) => {
        services.push(serviceName);
        return "keychain-operator";
      },
    },
  );

  assert.deepEqual(credentials, {
    operator: "keychain-operator",
    password: "env-password",
  });
  assert.deepEqual(services, [keychainServices.operator]);
});

test("both missing fields use their distinct Keychain services", () => {
  const services = [];
  const credentials = resolveCredentials(
    {},
    {
      platform: "darwin",
      readCredential: (serviceName) => {
        services.push(serviceName);
        return serviceName === keychainServices.operator
          ? "keychain-operator"
          : "keychain-password";
      },
    },
  );

  assert.deepEqual(credentials, {
    operator: "keychain-operator",
    password: "keychain-password",
  });
  assert.deepEqual(services, [
    keychainServices.operator,
    keychainServices.password,
  ]);
});

test("Keychain lookup uses the current account and no shell", () => {
  let invocation;
  const value = readKeychainCredential("credential-service", {
    platform: "darwin",
    username: "current-user",
    execute: (...args) => {
      invocation = args;
      return "secret-value\n";
    },
  });

  assert.equal(value, "secret-value");
  assert.deepEqual(invocation, [
    "security",
    [
      "find-generic-password",
      "-a",
      "current-user",
      "-s",
      "credential-service",
      "-w",
    ],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  ]);
  assert.equal(invocation[2].shell, undefined);
});

test("non-macOS missing credentials fail without attempting Keychain", () => {
  let reads = 0;
  assert.throws(
    () =>
      resolveCredentials(
        {},
        {
          platform: "linux",
          readCredential: () => {
            reads += 1;
          },
        },
      ),
    /Missing UPYUN_OPERATOR and UPYUN_PASSWORD; macOS Keychain fallback is unavailable on linux/,
  );
  assert.equal(reads, 0);
});

test("failed Keychain reads produce a safe error", () => {
  const sensitiveValue = "must-not-leak";
  assert.throws(
    () =>
      resolveCredentials(
        { UPYUN_OPERATOR: sensitiveValue },
        { platform: "darwin", readCredential: () => undefined },
      ),
    (error) => {
      assert.match(error.message, /Missing UPYUN_PASSWORD/);
      assert.match(error.message, /Keychain items were not found or could not be read/);
      assert.doesNotMatch(error.message, new RegExp(sensitiveValue));
      return true;
    },
  );
});

test("Keychain command failures and empty values are normalized", () => {
  assert.equal(
    readKeychainCredential("missing", {
      platform: "darwin",
      execute: () => {
        throw new Error("command details");
      },
    }),
    undefined,
  );
  assert.equal(
    readKeychainCredential("empty", {
      platform: "darwin",
      execute: () => "\n",
    }),
    undefined,
  );
});
