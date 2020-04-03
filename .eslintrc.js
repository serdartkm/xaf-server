module.exports = {
  env: {
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
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
