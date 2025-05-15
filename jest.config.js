

/** @type {import("jest").Config} **/
module.exports = {
  
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json', 'clover'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ["js","ts", "json"],
  preset: 'ts-jest',
  testMatch: ['**/?*(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.[jt]sx?$':'ts-jest'
  },
};