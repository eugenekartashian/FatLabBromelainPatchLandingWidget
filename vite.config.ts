import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const src = path.resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  resolve: {
    alias: [
      { find: '@translate', replacement: path.join(src, 'common/translate') },
      { find: /^@widgets\/(.*)$/, replacement: path.join(src, 'common/widgets/$1') },
      { find: /^@components\/(.*)$/, replacement: path.join(src, 'common/components/$1') },
      { find: /^common\/(.*)$/, replacement: path.join(src, 'common/$1') },
    ],
  },
});
