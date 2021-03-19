import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { ResultPostApiResponse } from '../utils/types';

interface tweetProps {
	tweet: ResultPostApiResponse;
}

const Tweet: React.FC<tweetProps> = ({ tweet }) => {
	return (
		<div
			style={{
				margin: '10px',
				padding: '10px',
				border: '1px solid #30363d',
				width: '500px',
				borderRadius: '8px',
			}}>
			<div style={{ display: 'inline-flex' }}>
				<Avatar src={`${tweet.profile_img_url}`} />
				<Typography
					gutterBottom
					style={{ padding: '10px', alignItems: 'center', fontWeight: 'bold' }}>
					@{tweet.twitter}
				</Typography>
			</div>
			<div>
				<Typography style={{ fontWeight: 'normal' }} gutterBottom>
					{tweet.tweet}
				</Typography>
			</div>
		</div>
	);
};

export default Tweet;
