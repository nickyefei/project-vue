module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    node: true,
    amd: true,
    commonjs: true,
    jquery: true
  },
  extends: [
    'eslint-config-standard',
  ],
  plugins: [
    'vue',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
}
