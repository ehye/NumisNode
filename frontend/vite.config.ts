import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const envDir = path.join(process.cwd(), '../')
  const env = loadEnv(mode, envDir, '')

  return {
    plugins: [react()],
    define: {
      'globalThis.__DEV__': JSON.stringify(false), // Turning off Apollo development mode
    },
    server: {
      port: 5173,
      proxy: {
        [env.GRAPHQL_URI]: {
          target: `http://localhost:${env.PORT}/${env.GRAPHQL_URI}`,
          changeOrigin: true,
        },
      },
      watch: {
        usePolling: true,
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['src/*/**.test.ts?(x)'],
      setupFiles: './testSetup.ts',
    },
  }
})
