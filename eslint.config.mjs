import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import babelParser from '@babel/eslint-parser'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
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
            plugins: ['jsx'],
          },
        },
      },
      globals: globals.browser,
    },
  },
  {
    plugins: {
      '@prettier': prettier,
      '@import': pluginImport,
      '@react': pluginReact,
    },
  },
  {
    ignores: ['node_modules', 'build'],
  },
  {
    rules: {
      indent: ['error', 2],
      '@prettier/prettier': 'error',
      'linebreak-style': [0, 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      '@react/react-in-jsx-scope': 'off',
      '@react/prop-types': 0,
      '@import/no-unresolved': [2, { caseSensitive: false }],
      '@react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      '@import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    settings: {
      '@import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  prettierConfig,
]
