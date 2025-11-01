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
  testMatch: ['**/__tests__/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!babel.config.js',
  ],
  maxWorkers: 8,
  testTimeout: 30000,
};
