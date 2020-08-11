module.exports = {
  extends: ["./node_modules/@warhol/tsconfig/eslint-api"],
  parserOptions: {
    project: "./tsconfig.lint.json"
  },
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  }
};
