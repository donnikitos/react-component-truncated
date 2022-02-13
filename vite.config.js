import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		cssCodeSplit: true,
		lib: {
			entry: path.resolve(
				__dirname,
				'src/components/Truncated/index.tsx',
			),
			formats: ['umd'],
			name: 'react-component-truncated',
			fileName: 'index',
		},
		minify: false,
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					'react': 'react',
					'react-dom': 'react-dom',
				},
			},
		},
	},
});
