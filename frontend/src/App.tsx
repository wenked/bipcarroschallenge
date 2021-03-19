import { Typography } from '@material-ui/core';
import React from 'react';
import RecentHashtagsBox from './components/RecentHashtagsBox';
import SearchBox from './components/SearchBox';
import { TweetsBox } from './components/TweetsBox';
import { ApiPostResponse, Hashtags } from './utils/types';
import './global.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const App: React.FC = () => {
	const [apiResponse, setApiResponse] = React.useState<ApiPostResponse>();
	const [recentHashtags, setRecentHashtags] = React.useState<Hashtags[]>();
	const [loading, setLoading] = React.useState(false);

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
				setLoading={setLoading}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					boxSizing: 'border-box',
				}}>
				{loading ? (
					<CircularProgress
						style={{
							padding: '10px',
							margin: '10px',
							display: 'flex',
							justifyContent: 'center',
						}}
					/>
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
