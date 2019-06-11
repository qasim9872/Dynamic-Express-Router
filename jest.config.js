// {
//     "transform": {
//         "^.+\\.(t|j)sx?$": "ts-jest"
//     },
//     "testPathIgnorePatterns": [
//         "/node_modules/"
//     ],
//     "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
//     "verbose": true
// }
module.exports = {
  roots: ["<rootDir>/lib"],
  testRegex: ".+\\.test\\.(ts)$",
  transform: {
    // "^.+\\.tsx?$": "ts-jest"
    // ".+\\.test\\.(ts)$": "ts-jest"
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  verbose: true
}
