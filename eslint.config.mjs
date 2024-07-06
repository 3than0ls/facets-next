import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            'unused-imports': unusedImports,
        },
    },
    {
        rules: {
            camelcase: 'error',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        ignores: ['_notes.*', '_notes.*.tsx', '**/.next/'],
    },
)
