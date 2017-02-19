module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jasmine": true,
        "mongo": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console":0
    },
    "globals": {
        "globalThis": true,
        "excludeNames_": true,
        "_visitMaxCount": true,
        _visitCount: true
    }
}
