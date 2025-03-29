import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true, // for importing { it, expect, describe }
    setupFiles: "test/setup.ts", // for importing jest-dom custom matchers
  },
});
