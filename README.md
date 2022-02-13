# React Component - `<Truncated />`

![npm](https://img.shields.io/npm/dt/react-component-truncated?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-component-truncated?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/donnikitos/react-clickAway?style=for-the-badge)
</br>
</br>

![node-current](https://img.shields.io/node/v/react-component-truncated?color=green&style=for-the-badge)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/donnikitos/react-component-truncated/dev/typescript/master?color=blue&style=for-the-badge)

A stylistic component to crop long texts, but still show the beginning and the end.
Pretty useful to display crypto tokens or crypto addresses and hashes.

Install with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):

```bash
# via npm
npm install react-component-truncated

# via yarn
yarn add react-component-truncated
```

## Usage

Use just as a normal HTML element, with the to be truncated contents between the tags.
Accepts all props and attributes of a normal HTMLDivElement.

### Example

```typescript
import Truncated from 'react-component-truncated';

// use in Component
function App(props) {
	return (
		<>
			This ETH wallet address needs to be truncated:{' '}
			<Truncated style={{ width: 210 }}>
				0x86F03eBCE80128d1C815b7729AeE4ADE12a77e8A
			</Truncated>
		</>
	);
}
```

## License

[MIT](LICENSE) Copyright (c) 2021 Nikita 'donnikitos' Nitichevski.
