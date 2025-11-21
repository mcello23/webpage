module.exports = {
  ci: {
    collect: {
      staticDistDir: '.',
      url: ['index.html', 'pages/side_proj/index.html', 'pages/frameworks/index.html'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'csp-xss': 'off',
      },
    },
  },
};
