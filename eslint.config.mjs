import path from 'path'
import { fileURLToPath } from 'url'

import globals from 'globals'
import pluginJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import babelParser from '@babel/eslint-parser'
import { FlatCompat } from '@eslint/eslintrc'
import airbnb from 'eslint-config-airbnb'
import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default [
  prettierConfig,
  ...compat.config(airbnb),
  {
    files: ['**/*.{js,mjs,cjs,jsx}']
  },
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        babelOptions: {
          parserOpts: {
            plugins: ['jsx']
          }
        }
      },
      globals: globals.browser
    }
  },
  {
    plugins: {
      '@prettier': prettier,
      '@import': pluginImport,
      '@react': pluginReact
    }
  },
  {
    ignores: ['node_modules', 'build']
  },
  {
    rules: {
      indent: ['error', 2],
      'consistent-return': 0,
      'max-len': 0,
      'comma-dangle': ['error', 'never'],
      'no-nested-ternary': 0,
      'no-console': 0,
      'no-underscore-dangle': 0,
      'no-use-before-define': 0,
      'jsx-a11y/control-has-associated-label': 0,
      'jsx-a11y/no-autofocus': 0,
      'jsx-a11y/label-has-associated-control': 0,
      'linebreak-style': [0, 'unix'],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-extraneous-dependencies': 0,
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'react/jsx-no-constructed-context-values': 0,
      'react-hooks/exhaustive-deps': 0,
      '@react/react-in-jsx-scope': 'off',
      '@react/prop-types': 0,
      'react/forbid-prop-types': 0,
      '@import/no-unresolved': [2, { caseSensitive: false }],
      '@react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/extensions': ['error', 'ignorePackages'],
      '@import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ]
    }
  },
  {
    settings: {
      '@import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/']
        }
      },
      react: {
        version: 'detect'
      }
    }
  },
  pluginJs.configs.recommended
]
