const html = require('eslint-plugin-html');

module.exports = [
  {
    // Global ignores (equivalent to .eslintignore)
    ignores: [
      'node_modules/**',
      'jbcore/**',
      'images/**',
      'backgrounds/**',
      'videos/**',
      'thumbs/**',
      'css/materialize.css',
      'css/materialize.min.css',
      'js/materialize.js',
      'js/materialize.min.js',
      'js/prism.js',
      'coverage/**',
      'tests/*/reports/**',
      'tests/jest/reports/**',
      'tests/k6/reports/**',
      'tests/puppeteer/reports/**',
    ],
  },
  {
    // Configuration for JavaScript files
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        Image: 'readonly',
        Buffer: 'readonly',
        localStorage: 'readonly',
        Chart: 'readonly',
        Blob: 'readonly',
        prompt: 'readonly',
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        // jQuery globals
        $: 'readonly',
        jQuery: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn'],
      'no-undef': 'error',
    },
  },
  {
    // Configuration for inline JavaScript in HTML files
    files: ['**/*.html'],
    plugins: {
      html,
    },
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'script',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        Image: 'readonly',
        localStorage: 'readonly',
        Chart: 'readonly',
        Blob: 'readonly',
        prompt: 'readonly',
        // jQuery globals
        $: 'readonly',
        jQuery: 'readonly',
        // Materialize globals
        M: 'readonly',
        // Custom globals
        certificateModal: 'readonly',
        toggleMobileMenu: 'readonly',
        showToast: 'readonly',
        acceptCookies: 'readonly',
        declineCookies: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn'],
      'no-undef': 'error',
    },
  },
];
