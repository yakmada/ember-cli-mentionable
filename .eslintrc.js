/* eslint-disable */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
      'eslint:recommended',
      'plugin:ember/recommended',
      'plugin:eslint-plugin-ember-best-practices/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
      "no-useless-escape": "off",
      "no-console": "off",   // allow console statements
      "ember/local-modules": "off",  // don't require destructuring of Ember
      "ember/use-ember-get-and-set": "off", // don't require `get(this, 'foo')`
      "ember/no-observers": 1,
      "ember/order-in-models": 0,
      "ember/order-in-components": 0,
      "ember/order-in-controllers": 0,
      "ember/order-in-routes": 0,
      "ember/closure-actions": 1,

      "ember/no-on-calls-in-components": 1, // we should bump this to 2 later
      "ember/named-functions-in-promises": 0,
      "ember/avoid-leaking-state-in-components": 1,
      "ember/alias-model-in-controller": 1,

      // this is from a GREAT plugin that enforces ember's best practices. Set them all to warnings
      "ember-best-practices/no-side-effect-cp": 1,
      "ember-best-practices/no-attrs": 1,
      "ember-best-practices/no-observers": 0,    // this is part of the ember package, so I disabled it here
      "ember-best-practices/require-dependent-keys": 1,
      "ember-best-practices/no-lifecycle-events": 1,
      "ember-best-practices/no-attrs-snapshot": 1,
      "ember-best-practices/no-global-jquery": 1,

      "no-cond-assign": [
        2,
        "except-parens"
      ],
      "curly": [
        2,
        "multi-line"
      ],
      "no-debugger": 2,
      "eqeqeq": 1,  // this should really be 2
      "no-eval": 2,
      "guard-for-in": 0,
      "wrap-iife": 2,
      "linebreak-style": [
        2,
        "unix"
      ],
      "new-cap": [
          2,
          {
              "capIsNewExceptions": ["Ember.A"]
          }
      ],
      "no-caller": 2,
      "no-empty": [
        2,
        {
          "allowEmptyCatch": true
        }
      ],
      "no-new": 0,
      "no-plusplus": 0,
      "no-undef": 2,
      "dot-notation": 2,
      "strict": 0,
      "no-eq-null": 1,  // this should really be 2
      "no-unused-vars": [
          "error", {
              "vars": "all",
              "args": "none",
              "ignoreRestSiblings": false
          }
      ],
      "space-before-function-paren": [
        2,
        "never"
      ],
      "no-spaced-func": 2,
    //   "array-bracket-spacing": [
    //     2,
    //     "always"
    //   ],
      "space-in-parens": [
        2,
        "never"
      ],
      "quote-props": [
        2,
        "as-needed"
      ],
      "key-spacing": [
        2,
        {
          "beforeColon": false,
          "afterColon": true
        }
      ],
      "space-unary-ops": [
        2,
        {
          "words": false,
          "nonwords": false
        }
      ],
      "space-before-blocks": 2,
      "no-mixed-spaces-and-tabs": 2,
      "no-trailing-spaces": 2,
      "comma-dangle": 1,
      "comma-spacing": [
        2,
        {
          "after": true,
          "before": false
        }
      ],
      "yoda": [
        2,
        "never"
      ],
      "no-with": 2,
      "brace-style": [
        1,
        "stroustrup",
        {
          "allowSingleLine": true
        }
      ],
      "no-multiple-empty-lines": 2,
      "no-multi-str": 2,
      "one-var": [
        2,
        "never"
      ],
      "semi-spacing": [
        2,
        {
          "before": false,
          "after": true
        }
      ],
      "space-before-blocks": [
        2,
        "always"
      ],
      "comma-style": [
        2,
        "last"
      ],
      "space-infix-ops": 2,
      "camelcase": [
        2,
        {
          "properties": "always"
        }
      ],
      "eol-last": 2,
      "keyword-spacing": [
        2,
        {}
      ],
      "semi": [
        2,
        "always"
      ],
      "consistent-this": [
        2,
        "_this"
      ],
      "quotes": [
        2,
        "single",
        {
          "avoidEscape": true
        }
      ],
      "indent": [
        2,
        2,
        {
          "SwitchCase": 1
        }
      ],
      "max-len": [
        1,
        160
    ],
    "no-lonely-if": 2,
    "block-spacing": 2
  },
  globals: {

  }
};
