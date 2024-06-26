const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    ...[
      "@vercel/style-guide/eslint/node",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/react",
      "@vercel/style-guide/eslint/next",
    ].map(require.resolve),
    "turbo",
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-default-export": "off",

    // Will have to temporarily disable this
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "off",

    // this is for react-hook-form issue. Refer to https://github.com/orgs/react-hook-form/discussions/8622
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    // "@typescript-eslint/no-unsafe-call": "off",
    // "@typescript-eslint/no-unsafe-assignment": "off",
    // "@typescript-eslint/no-unsafe-return": "off",
    // "jsx-a11y/heading-has-content": "off",
    // "@typescript-eslint/naming-convention": [
    //   "error",
    //   {
    //     selector: "enum",
    //     format: ["PascalCase", "UPPER_CASE"],
    //   },
    // ],
  },
};
