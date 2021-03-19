import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Hashtags } from '../utils/types';
import axios from 'axios';

interface RecentHashtagsBoxProps {
	recentHashtags: Hashtags[] | undefined;
	setApiResponse: React.Dispatch<React.SetStateAction<Hashtags | undefined>>;
}

const RecentHashtagsBox: React.FC<RecentHashtagsBoxProps> = ({
	recentHashtags,
	setApiResponse,
}) => {
	return (
		<div
			style={{
				border: '1px solid #d8d4cf',
				padding: '10px',
				margin: '60px',
				display: 'flex',
				flexDirection: 'column',
				minHeight: '300px',
				height: '100%',
				borderRadius: '8px',
			}}>
			{recentHashtags?.map((hashtag, i) => {
				return (
					<Button
						size='small'
						variant='text'
						onClick={async () => {
							const res = await axios.post('http://localhost:3333/hashtag', {
								hashtag: `${hashtag.hashtag}`,
							});
							setApiResponse(res.data);
						}}>
						<Typography
							key={i}
							variant='h4'
							style={{ fontSize: '25px', textTransform: 'none' }}>
							#{hashtag.hashtag}
						</Typography>
					</Button>
				);
			})}
		</div>
	);
};

export default RecentHashtagsBox;
