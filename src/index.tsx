import React from 'react';
import ReactDOM from 'react-dom';
import Truncated from './components/Truncated';

ReactDOM.render(
	<>
		This ETH wallet address needs to be truncated:{' '}
		<Truncated style={{ width: 210 }}>
			0x86F03eBCE80128d1C815b7729AeE4ADE12a77e8A
		</Truncated>
	</>,
	document.getElementById('root'),
);
