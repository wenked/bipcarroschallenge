import { Typography } from '@material-ui/core';
import React from 'react';
import RecentHashtagsBox from './components/RecentHashtagsBox';
import SearchBox from './components/SearchBox';
import { TweetsBox } from './components/TweetsBox';
import { Hashtags } from './utils/types';
import './global.css';

const App: React.FC = () => {
	const [apiResponse, setApiResponse] = React.useState<Hashtags>();
	const [recentHashtags, setRecentHashtags] = React.useState<Hashtags[]>();

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
					<RecentHashtagsBox
						recentHashtags={recentHashtags}
						setApiResponse={setApiResponse}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default App;
