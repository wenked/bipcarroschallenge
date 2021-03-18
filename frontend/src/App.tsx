import { Typography } from '@material-ui/core';
import React from 'react';
import SearchBox from './components/SearchBox';
import { TweetsBox } from './components/TweetsBox';
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
			{!apiResponse ? (
				<Typography variant='h4'>Loading...</Typography>
			) : (
				<TweetsBox apiResponse={apiResponse} />
			)}
		</div>
	);
};

export default App;
