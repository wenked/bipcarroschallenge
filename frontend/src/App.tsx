import { Typography } from '@material-ui/core';
import React from 'react';
import RecentHashtagsBox from './components/RecentHashtagsBox';
import SearchBox from './components/SearchBox';
import { TweetsBox } from './components/TweetsBox';
import { Hashtags, RecentsHashtags } from './utils/types';

const App: React.FC = () => {
	const [apiResponse, setApiResponse] = React.useState<Hashtags>();
	const [recentHashtags, setRecentHashtags] = React.useState<RecentsHashtags>();

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<Typography variant='h1' gutterBottom>
				Hashtag
			</Typography>
			<SearchBox
				setApiResponse={setApiResponse}
				setRecentHashtags={setRecentHashtags}
			/>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{!apiResponse ? (
					<Typography variant='h4'>Loading...</Typography>
				) : (
					<TweetsBox apiResponse={apiResponse} />
				)}
				{recentHashtags ? (
					<RecentHashtagsBox recentHashtags={recentHashtags} />
				) : (
					'hmmmm'
				)}
			</div>
		</div>
	);
};

export default App;
