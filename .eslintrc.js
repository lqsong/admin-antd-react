module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'eslintobject-shorthand': ['always'],
  },
  globals: {},
};
