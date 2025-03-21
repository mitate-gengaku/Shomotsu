import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths"
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  resolve: {
    alias: {
      '@/src/': path.resolve(__dirname),
    }
  },
  test: {
    css: true,
    coverage: {
      include: [
        "src"
      ],
      exclude: [
        // "src/components/ui",
        // "src/middleware.ts",
        // "src/mdx-components.tsx",
        // "src/config",
        // "src/lib",
        // "src/types",
        // "src/**/schema",
      ],
      reporter: ['html', 'clover', 'text', 'json-summary', 'json'],
    },
    environment: "happy-dom",
    globals: true,
    include: [
      '**/*.test.?(c|m)[jt]s?(x)'
    ],
    setupFiles: [
      "./src/tests/setup/setup.ts",
      "./src/tests/setup/mock.tsx"
    ]
  },
})