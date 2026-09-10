import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const serverTarget =
  process.env.SERVER_HTTPS ||
  process.env.SERVER_HTTP ||
  'http://localhost:5408';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to the app service
      '/api': {
        target: serverTarget,
        changeOrigin: true,
        secure: false
      }
    }
    },
    base: '/dist/',
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {

                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }

});
