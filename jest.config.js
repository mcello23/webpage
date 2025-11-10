module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'ecmascript',
          },
        },
        module: {
          type: 'commonjs',
        },
        sourceMaps: false,
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(jsdom|parse5)/).+\\.js$'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['**/tests/jest/**/*.test.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/tests/k6/',
    '/tests/puppeteer/',
  ],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'js/**/*.js', // Only collect coverage from our JS files
    '!js/materialize.js', // Exclude third-party libraries
    '!js/prism.js', // Exclude third-party libraries
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tests/**',
    '!jest.config.js',
    '!babel.config.js',
    '!eslint.config.js',
  ],
  coverageReporters: ['text', 'lcov', 'json-summary', 'html'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 35,
      lines: 50,
      statements: 50,
    },
  },
  maxWorkers: 8,
  testTimeout: 30000,
  // Prefer natural Jest exit; with proper cleanup, workers should terminate cleanly
  forceExit: false,
};
