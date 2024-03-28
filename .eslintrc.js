module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    project: [require.resolve('./tsconfig.json')],
  },
  rules: {
    '@typescript-eslint/type-annotation-spacing': 'warn',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/no-unescaped-entities': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/cypress.config.ts',
        ],
        optionalDependencies: false,
      },
    ],
  },
  ignorePatterns: [
    // '.eslintrc.js',
    // '*.config.js',
    'coverage',
    '.next',
    'cdk.out',
    // 'next-env.d.ts',
  ],
};
