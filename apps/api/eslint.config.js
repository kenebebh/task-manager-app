import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: [
      ".agents/**",
      ".claude/**",
      ".cursor/**",
      ".devin/**",
      "src/prisma/contract.d.ts",
    ],
  },
];
