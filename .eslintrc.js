module.exports = {
    "extends": "standard",
    "rules": {
        "indent": ["error", 4]
    },
    "overrides": [
        {   
            "files": "*",
            "rules": {
                "no-throw-literal": "off",
                "no-unused-vars": "off"
            }
        }
    ]
};