module.exports = {
      "env": {
          "browser": true,
          "commonjs": true,
          "es6": true,
          "node": true,
          "mocha": true
      },
     "extends": ["eslint:recommended", "google", "plugin:prettier/recommended"],
      "parserOptions": {
        "ecmaVersion": 2017
    },

  "rules": {
    "indent": ["error", 4],
    "linebreak-style": ["error", "windows"],
    /*"quotes": ["error", "single"]*/
    "semi": ["error", "always"],
    "camelcase": "off",
    "no-console": "off",
    "new-cap": [
      "error",
      {
        "capIsNewExceptions": ["Router"]
      }
    ],
    "guard-for-in": "off",
    "no-case-declarations": "off",
    "max-len": [
      "warn",
      {
        "code": 80
      }
    ],

     "prefer-const": ["off", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
    }]

    ,
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "parser": "flow",
        "tabWidth": 4,
        "arrowParens": "always",
        "bracketSpacing": true,
        "trailingComma": "none"
      }
    ]
    
   

 
  
}

   
}