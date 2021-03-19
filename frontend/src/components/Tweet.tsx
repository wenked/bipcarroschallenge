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
				border: '1px solid #d8d4cf',
				width: '500px',
				borderRadius: '8px',
			}}>
			<div style={{ display: 'inline-flex' }}>
				<Avatar src={`${tweet.twitterUser.profile_img_url}`} />
				<Typography
					gutterBottom
					style={{ padding: '10px', alignItems: 'center', fontWeight: 'bold' }}>
					@{tweet.twitterUser.twitter}
				</Typography>
			</div>
			<div>
				<Typography style={{ fontWeight: 'normal' }} gutterBottom>
					{tweet.content}
				</Typography>
			</div>
		</div>
	);
};

export default Tweet;
