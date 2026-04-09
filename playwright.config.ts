import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: Number(process.env.DEFAULT_TIMEOUT) || 30000,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  projects: [
    {
      name: "api-tests",
      testMatch: "**/*.test.ts",
    },
  ],
});
