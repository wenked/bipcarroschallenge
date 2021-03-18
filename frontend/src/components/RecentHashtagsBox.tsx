import { Typography } from '@material-ui/core';
import React from 'react';
import { RecentsHashtags } from '../utils/types';

interface RecentHashtagsBoxProps {
	recentHashtags: RecentsHashtags | undefined;
}

const RecentHashtagsBox: React.FC<RecentHashtagsBoxProps> = ({
	recentHashtags,
}) => {
	console.log(recentHashtags?.hashtags.reverse());
	return (
		<div style={{ border: '1px solid black', padding: '10px', margin: '60px' }}>
			{recentHashtags?.hashtags.reverse().map((hashtag, i) => {
				return (
					<Typography key={i} variant='h4'>
						{hashtag.hashtag}
					</Typography>
				);
			})}
		</div>
	);
};

export default RecentHashtagsBox;
