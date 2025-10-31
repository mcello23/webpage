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
      '**/*.html', // Ignore HTML files - inline scripts already have ESLint comments
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
];
