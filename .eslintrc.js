// https://standardjs.com/rules.html - default config
// https://github.com/leonidlebedev/javascript-airbnb/blob/master/README.md - rules in this file added from AirBnB config

module.exports = {
  extends: [
    "standard",
    "prettier",
    "prettier/babel",
    "prettier/react",
    "prettier/standard",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:compat/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended"
  ],
  plugins: ["react-hooks", "simple-import-sort"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020
  },
  settings: {
    react: {
      version: "detect"
    },
    polyfills: [
      "Promise",
      "fetch",
      'es6-number',
      'Object.entries'
    ]
  },
  env: {
    browser: true
  },
  rules: {
    /* eslint prettier  rules */
    "max-len": ["error", { "code": 100, "ignoreUrls": true }],
    "curly": ["error", "all"],
    "no-mixed-operators": ["error"],
    "quotes": ["error", "single"],

    /* eslint rules */
    "simple-import-sort/sort": ["error"],
    "arrow-parens": ["warn", "as-needed"],
    "comma-dangle": ["warn", "always-multiline"],
    "dot-notation": ["warn"],
    "arrow-body-style": ["error", "as-needed"],
    "object-shorthand": ["warn", "always"],
    "array-callback-return": ["error", {}],
    "array-bracket-spacing": ["error", "never"],
    "function-paren-newline": ["warn", "multiline"],
    "computed-property-spacing": ["error", "never"],
    "key-spacing": ["error", { "align": "colon" }],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "brace-style": ["error", "1tbs"],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "no-multi-spaces": ["error"],
    "no-trailing-spaces": ["error"],
    "spaced-comment": ["error", "always", { "block": { "balanced": true } }],
    "space-infix-ops": ["error", { "int32Hint": false }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "always"],
    "computed-property-spacing": ["error", "always"],
    "comma-spacing": ["error", { "before": false, "after": true }],

    "no-var": ["error"],
    "no-console": ["warn"],
    "no-plusplus": ["error"],
    "no-else-return": ["error"],
    "no-multi-assign": ["error"],
    "no-useless-concat": ["warn"],
    "no-param-reassign": ["error", { "props": true }],
    "no-use-before-define": ["error", { "functions": true, "classes": true, "variables": true }],
    "no-case-declarations": ["warn"],

    "prefer-const": ["error", {}],
    "prefer-spread": ["error"],
    "prefer-template": ["warn"],
    "prefer-rest-params": ["error"],
    "prefer-destructuring": ["error", { "object": true, "array": true }],
    
    "import/no-useless-path-segments": ["error"],

    "react-hooks/rules-of-hooks": ["error"],
    "react-hooks/exhaustive-deps": ["warn"],
    
    "react/boolean-prop-naming": ["error", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }],
    "react/button-has-type": ["error"],
    "react/default-props-match-prop-types": ["error"],
    "react/destructuring-assignment": ["error", 'always'],
    "react/function-component-definition": ["error", { "namedComponents": "function-declaration" }],
    "react/no-access-state-in-setstate": ["error"],
    "react/no-adjacent-inline-elements": ["error"],
    "react/no-array-index-key": ["warn"],
    "react/no-children-prop": ["error"],
    "react/no-danger": ["error"],
    "react/no-danger-with-children": ["error"],
    "react/no-deprecated": ["error"],
    "react/no-did-mount-set-state": ["error"],
    "react/no-did-update-set-state": ["error"],
    "react/no-direct-mutation-state": ["error"],
    "react/no-find-dom-node": ["error"],
    "react/no-is-mounted": ["error"],
    // "react/no-multi-comp": ["error"],
    "react/no-redundant-should-component-update": ["error"],
    "react/no-render-return-value": ["error"],
    "react/no-set-state": ["error"],
    "react/no-this-in-sfc": ["error"],
    "react/no-typos": ["error"],
    "react/no-unescaped-entities": ["error"],
    "react/no-unknown-property": ["error"],
    "react/no-unsafe": ["error"],
    "react/no-unused-prop-types": ["error"],
    "react/no-unused-state": ["error"],
    "react/no-will-update-set-state": ["error"],
    "react/prefer-read-only-props": ["error"],
    "react/prefer-stateless-function": ["error"],
    "react/prop-types": ["error"],
    "react/react-in-jsx-scope": ["error"],
    "react/require-default-props": ["error"],
    "react/require-render-return": ["error"],
    "react/self-closing-comp": ["error"],
    "react/sort-comp": ["error"],
    // "react/sort-prop-types": ["error", {
    //   "ignoreCase": true,
    //   "requiredFirst": true,
    //   "sortShapeProp": true
    // }],
    "react/state-in-constructor": ["error"],
    "react/static-property-placement": ["error"],
    "react/style-prop-object": ["error"],
    "react/void-dom-elements-no-children": ["error"],

    "react/jsx-boolean-value": ["error"],
    "react/jsx-boolean-value": ["error"],
    "react/jsx-child-element-spacing": ["error"],
    "react/jsx-closing-bracket-location": ["error"],
    "react/jsx-closing-tag-location": ["error"],
    "react/jsx-curly-brace-presence": ["error"],
    "react/jsx-curly-newline": ["error"],
    "react/jsx-curly-spacing": ["error", {"when": "always"}],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-handler-names": ["error"],
    "react/jsx-indent": ["warn", 2, {"checkAttributes": true, "indentLogicalExpressions": true}],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-key": ["error"],
    "react/jsx-max-props-per-line": ["error", { "when": "multiline", "maximum": 1 }],
    "react/jsx-no-duplicate-props": ["error"],
    "react/jsx-no-script-url": ["error"],
    "react/jsx-no-target-blank": ["error", {"allowReferrer": true, "enforceDynamicLinks": "always"}],
    "react/jsx-no-undef": ["error"],
    "react/jsx-no-useless-fragment": ["error"],
    "react/jsx-one-expression-per-line": ["error"],
    "react/jsx-pascal-case": ["error"],
    "react/jsx-props-no-multi-spaces": ["error"],
    // "react/jsx-props-no-spreading": ["error"],
    // "react/jsx-sort-default-props": ["error", {"ignoreCase": true}],
    "react/jsx-sort-props": ["error", {
      "ignoreCase": true, 
      "callbacksLast": true, 
      "shorthandLast": true, 
      "reservedFirst": true
    }],
    "react/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "never"
    }],
    "react/jsx-uses-vars": ["error"],
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical":"parens-new-line",
      "prop": "parens-new-line"
    }]
  }
}