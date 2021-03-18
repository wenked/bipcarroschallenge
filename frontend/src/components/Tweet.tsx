import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { Result } from '../utils/types';

interface tweetProps {
	tweet: Result;
}

const Tweet: React.FC<tweetProps> = ({ tweet }) => {
	return (
		<div
			style={{
				margin: '10px',
				padding: '10px',
				border: '1px solid black',
			}}>
			<Avatar src={`${tweet.twitterUser.profile_img_url}`} />
			<Typography variant='h5' gutterBottom>
				@{tweet.twitterUser.twitter}
			</Typography>
			<Typography variant='h6' gutterBottom>
				{tweet.content}
			</Typography>
		</div>
	);
};

export default Tweet;
