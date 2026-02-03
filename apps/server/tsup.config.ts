// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['api/index.ts'],
  outDir: 'dist',
  clean: true,
  format: ['cjs'], // Node.js runtime
  dts: true,       // generate type declarations
  sourcemap: true,
  target: 'node16',
  external: ['express', 'cors', 'cookie-parser', 'jsonwebtoken', 'mongoose'], // dependencies that you don’t want bundled
});
