import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import styledLib from './vite-plugin-styledLib';

export default defineConfig({
	plugins: [react(), styledLib()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/components/Truncated/index.tsx'),
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
