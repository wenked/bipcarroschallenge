import { Typography } from '@material-ui/core';
import React from 'react';
import SearchBox from './components/SearchBox';
import { Hashtags } from './utils/types';

const App: React.FC = () => {
	const [apiResponse, setApiResponse] = React.useState<Hashtags>();

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
			<SearchBox setApiResponse={setApiResponse} />
		</div>
	);
};

export default App;
