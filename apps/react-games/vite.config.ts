/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/react-games',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  
  resolve: {
    alias: {
      '@theame': 'libs/shared/styles/',
    },
  },

  build: {
    outDir: '../../dist/apps/react-games',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';
          @import '@theame/vars.scss';
        `,
      }
    }
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/react-games',
      provider: 'v8',
    },
    alias: {
      '@theame': path.resolve(__dirname, '../../libs/shared/styles/'),
      "@crypto-game": path.resolve(__dirname, "../../libs/crypto-game/src/lib/"),
    },
  },
});
