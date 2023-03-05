module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["node_modules/tsconfig/base.json"],
  },
  plugins: [],
  extends: [
    "turbo",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:@next/next/core-web-vitals",
    "prettier",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
  },
  overrides: [
    {
      files: ["**/app/**/*.tsx", "**/pages/**/*.tsx"],
      rules: {
        "import/prefer-default-export": "error",
        "import/no-default-export": "off",
      },
    },
    // {
    //   files: ["**/Scenes3D/**/*.*"],
    //   rules: {
    //     "@typescript-eslint/no-unsafe-assignment": "off",
    //   },
    // },
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "*.config.js",
    "index.js",
    "**/Scenes3D/**/*.*",
  ],
};
