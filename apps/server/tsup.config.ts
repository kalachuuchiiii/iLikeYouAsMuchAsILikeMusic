
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  outDir: 'dist',
  clean: true,
  format: ['cjs'],
  dts: false,                // optional – skip if not needed
  sourcemap: true,
  target: 'node18',
  bundle: true,
  splitting: false,
  noExternal: [/^@repo\/.*/], // ← inlines ALL @repo/* packages
  external: ['express', 'mongoose', 'jsonwebtoken', 'cors', 'cookie-parser', 'bcryptjs', 'axios', 'zod']
});