// @ts-check

import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tslint from 'typescript-eslint'

export default tslint.config(eslint.configs.recommended, prettierConfig, ...tslint.configs.recommendedTypeChecked, {
  // ignores: ['src/types'],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
