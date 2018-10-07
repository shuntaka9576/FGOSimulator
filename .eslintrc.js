module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "no-underscore-dangle": [
        "error",
        {"allow": ["__REDUX_DEVTOOLS_EXTENSION__"]}
      ]
    }
};
