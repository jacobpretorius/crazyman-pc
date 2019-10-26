module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": ["error", "always-multiline"],
    "prettier/prettier": "off",
    "no-unneeded-ternary": "error",
    "spaced-comment": "warn",
    "no-restricted-globals": "error",
    "no-underscore-dangle": "warn",
    "vue/no-use-v-if-with-v-for": "error",
    "vue/return-in-computed-property": "error",
    "vue/order-in-components": "warn",
    "vue/require-prop-types": "error",
    "vue/attributes-order": "warn",
    "vue/require-default-prop": "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
