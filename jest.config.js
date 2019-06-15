module.exports = {
    testEnvironment: "node",
    testRegex: "(/tests/.*\\.(test|spec))\\.(ts|tsx|js)$",
    collectCoverageFrom: ["src/**/*.ts"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    modulePaths: ["src"],
    coverageDirectory: "<rootDir>/coverage",
    transform: {
        "\\.(ts|tsx)": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js"]
};
