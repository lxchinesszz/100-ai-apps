import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readProjectFile = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("home version label", () => {
  const packageJson = JSON.parse(readProjectFile("package.json"));
  const viteConfig = readProjectFile("vite.config.ts");
  const tripList = readProjectFile("src/features/trips/TripList.tsx");

  it("uses the release version from package metadata", () => {
    expect(packageJson.version).toBe("0.1.6");
    expect(viteConfig).toContain("JSON.stringify(packageJson.version)");
    expect(viteConfig).toContain('with { type: "json" }');
  });

  it("injects a fixed Shanghai build identifier and a development marker", () => {
    expect(viteConfig).toContain('timeZone: "Asia/Shanghai"');
    expect(viteConfig).toContain('command === "build" ? shanghaiBuildId() : "DEV"');
    expect(viteConfig).toContain("CST");
  });

  it("renders both injected values beside the home wordmark", () => {
    expect(tripList).toContain("import.meta.env.VITE_APP_VERSION");
    expect(tripList).toContain("import.meta.env.VITE_BUILD_ID");
    expect(tripList).toContain('className="app-version"');
  });
});
