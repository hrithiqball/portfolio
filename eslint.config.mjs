import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  hooksPlugin.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  nextPlugin.configs['core-web-vitals'],
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
      }
    },
    rules: {
      // from eslint-config-next
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      // from eslint-config-next/typescript
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      // user overrides
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  }
)
