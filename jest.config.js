module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest/setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'ecmascript',
            jsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
        module: {
          type: 'commonjs',
        },
        sourceMaps: false,
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(jsdom|parse5|cheerio)/).+\\.js$'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['**/tests/jest/**/*.test.{js,jsx}', '**/src/**/*.test.{js,jsx}'],
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
    'public/js/**/*.js',
    'src/**/*.{js,jsx}',
    '!public/js/materialize.js',
    '!public/js/prism.js',
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
  forceExit: false,
};
