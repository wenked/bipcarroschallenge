import { Typography } from '@material-ui/core';
import React from 'react';
import { Hashtags } from '../utils/types';

interface TweetsBoxProps {
	apiResponse: Hashtags | undefined;
}

export const TweetsBox: React.FC<TweetsBoxProps> = ({ apiResponse }) => {
	return (
		<div>
			{apiResponse?.results.map((tweet, i) => {
				return (
					<div
						key={i}
						style={{
							display: 'flex',
							flexDirection: 'column',
							padding: '10px',
						}}>
						<Typography variant='h5' gutterBottom>
							@{tweet.twitterUser.twitter}
						</Typography>
						<Typography variant='h6' gutterBottom>
							{tweet.content}
						</Typography>
					</div>
				);
			})}
		</div>
	);
};
