const html = require('eslint-plugin-html');

module.exports = [
  {
    // Global ignores (equivalent to .eslintignore)
    ignores: [
      'node_modules/**',
      '.yarn/**',
      'jbcore/**',
      'images/**',
      'backgrounds/**',
      'videos/**',
      'thumbs/**',
      'css/materialize.css',
      'css/materialize.min.css',
      '**/js/materialize.js',
      '**/js/materialize.min.js',
      '**/js/prism.js',
      'public/js/materialize.js',
      'public/js/prism.js',
      'src/styles/materialize.css',
      'src/styles/materialize.min.css',
      'coverage/**',
      'tests/*/reports/**',
      'tests/jest/reports/**',
      'tests/k6/reports/**',
      'tests/puppeteer/reports/**',
      'dist/**',
      'deploy_temp/**',
      '_headers',
      '**/*.min.js',
      '**/*.min.css',
      '*.config.js',
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
        // Node.js test environment globals
        global: 'writable',
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
    // Configuration for JSX/React files
    files: ['**/*.jsx'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        FormData: 'readonly',
        Image: 'readonly',
        // React globals
        React: 'readonly',
        // Node.js globals (for CookieConsent component)
        process: 'readonly',
        // Jest/Testing globals
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        global: 'writable',
      },
    },
    rules: {
      'no-unused-vars': 'off',
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
