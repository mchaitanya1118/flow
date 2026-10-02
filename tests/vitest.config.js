const path = require('path');

module.exports = {
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@estateflow/auth': path.resolve(__dirname, '../packages/auth/src/index.ts'),
      '@estateflow/search': path.resolve(__dirname, '../packages/search/src/index.ts'),
      '@estateflow/types': path.resolve(__dirname, '../packages/types/src/index.ts'),
      '@estateflow/validation': path.resolve(__dirname, '../packages/validation/src/index.ts'),
      '@estateflow/ui': path.resolve(__dirname, '../packages/ui/src/index.ts'),
    },
  },
};
