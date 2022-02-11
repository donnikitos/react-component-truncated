import fs from 'fs';
import { Plugin } from 'vite';

const injector = `function styleInject(css, ref) {
	if ( ref === void 0 ) ref = {};

	var insertAt = ref.insertAt;

	if (!css || typeof document === 'undefined') { return; }

	var head = document.head || document.getElementsByTagName('head')[0];

	var style = document.createElement('style');

	if (insertAt === 'top') {
		if (head.firstChild) {
			head.insertBefore(style, head.firstChild);
		} else {
			head.appendChild(style);
		}
	} else {
		head.appendChild(style);
	}

	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}`;

const isStylesheetFile = new RegExp(/.(s)?css(\?used)?$/i);

function styledLib(): Plugin {
	const styleMap = new Map();

	return {
		name: 'styled-lib',
		apply: 'build',
		transform(code, id) {
			if (isStylesheetFile.test(id)) {
				styleMap.set(id, code);
			}

			return null;
		},
		renderChunk(code, chunk, options) {
			console.log('====================================================');
			const styles = Object.entries(chunk.modules).filter(([key]) =>
				isStylesheetFile.test(key),
			);

			styles.forEach(([moduleName, module]) => {
				const styles = styleMap.get(moduleName);
				code = code.replace(
					module.code,
					`(${injector})(\`${styles}\`);
${module.code}`,
				);
			});

			return code;
		},
		// generateBundle(options, bundles, isWrite) {
		// 	console.log('bundles', bundles);
		// 	Object.entries(bundles).forEach(([fileName, asset]) => {
		// 		console.log('fileName', fileName);
		// 	});
		// },
		async writeBundle(options, bundles) {
			Object.entries(bundles).forEach(([fileName, asset]) => {
				if (asset.type === 'asset' && isStylesheetFile.test(fileName)) {
					fs.rmSync(options.dir + `/${fileName}`);
				} else if (asset.type === 'chunk') {
					// console.log('asset', asset);
					// console.log('asset.modules', asset.modules);
					// const styles = Object.entries(asset.modules).filter(
					// 	([key]) => isStylesheetFile.test(key),
					// );
					// styles[0][1].code += 'qwerty1234';
					// console.log(...styles[0]);
				}
			});
		},
	};
}

export default styledLib;
