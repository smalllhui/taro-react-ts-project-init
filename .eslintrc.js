module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended', // 加上这一行，解决eslint prettier 冲突问题
  ],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],

  globals: {
    defineAppConfig: true, //解决报错 no-undef
    definePageConfig: true, //解决报错 no-undef
  },
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    /** @js */
    quotes: [2, 'single'], // 强制使用一致的单引号
    semi: [2, 'never'], // 强制是否使用分号
    'no-undef': 'error', // 不能有未定义的变量
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-debugger': 'off', // 是否允许使用debugger
    'no-console': 'off', //  是否允许使用console
    'import/no-commonjs': 'off', // 关闭

    // ts 详细规则：https://typescript-eslint.io/rules/
    /** @typescript */
    '@typescript-eslint/no-explicit-any': 'off', //可以使用any
    '@typescript-eslint/no-var-requires': 'off', //可以使用require
  },
}
