module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['react'],
  settings: {
    'react' : {
        'version' : 'detect'
    }
  },
  rules: {
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'react/react-in-jsx-scope': ['off'],
    '@typescript-eslint/consistent-type-assertions': ['error', {
        objectLiteralTypeAssertions : 'allow-as-parameter',
        assertionStyle : 'as'
    }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};
