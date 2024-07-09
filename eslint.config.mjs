import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            camelcase: 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    {
        ignores: ['_notes.*', '_notes.*.tsx', '**/.next/'],
    },
)
