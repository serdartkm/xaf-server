module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
    describe: 'readonly',
    context: 'readonly',
    before: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterAll: 'readonly',
    process: 'readonly',
    jest: 'readonly',
    global: 'readonly'
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
