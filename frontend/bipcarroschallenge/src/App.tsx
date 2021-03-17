import { Typography } from '@material-ui/core';
import React from 'react';
import SearchBox from './components/SearchBox';

const App: React.FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<Typography variant='h1' gutterBottom>
				Teste
			</Typography>
			<SearchBox />
		</div>
	);
};

export default App;
