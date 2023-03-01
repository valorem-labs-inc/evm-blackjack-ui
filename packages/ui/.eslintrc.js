module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"],
  },
  ignorePatterns: ["**/__tests__/**/*.*", "*.d.ts*"],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
  },
};
