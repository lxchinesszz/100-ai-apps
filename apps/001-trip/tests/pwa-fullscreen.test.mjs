import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readProjectFile = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("PWA fullscreen configuration", () => {
  const html = readProjectFile("index.html");
  const viteConfig = readProjectFile("vite.config.ts");
  const appCss = readProjectFile("src/styles/app.css");

  it("enables the iOS standalone translucent status bar", () => {
    expect(html).toContain(
      '<meta name="apple-mobile-web-app-capable" content="yes" />',
    );
    expect(html).toContain(
      '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
    );
  });

  it("allows the viewport to extend into iOS safe areas", () => {
    expect(html).toContain("viewport-fit=cover");
  });

  it("keeps the manifest scoped to the standalone trip app", () => {
    expect(viteConfig).toMatch(/const base = ["']\/trip\/["']/);
    expect(viteConfig).toMatch(/start_url:\s*base/);
    expect(viteConfig).toMatch(/scope:\s*base/);
    expect(viteConfig).toMatch(/display:\s*["']standalone["']/);
  });

  it("keeps the document root on a full-screen size baseline", () => {
    expect(appCss).toMatch(
      /html,\s*body,\s*#root\s*{[^}]*margin:\s*0;[^}]*width:\s*100%;[^}]*(?:min-)?height:\s*100%;[^}]*}/s,
    );
  });
});
