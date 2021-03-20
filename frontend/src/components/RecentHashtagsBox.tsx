import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { ApiPostResponse, Hashtags } from '../utils/types';
import axios from 'axios';

interface RecentHashtagsBoxProps {
	recentHashtags: Hashtags[] | undefined;
	setApiResponse: React.Dispatch<
		React.SetStateAction<ApiPostResponse | undefined>
	>;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecentHashtagsBox: React.FC<RecentHashtagsBoxProps> = ({
	recentHashtags,
	setApiResponse,
	setError,
	setLoading,
}) => {
	return (
		<div
			style={{
				border: '1px solid #30363d',
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
						key={i}
						size='small'
						variant='text'
						onClick={async () => {
							try {
								setLoading(true);
								const res = await axios.post(
									`${process.env.REACT_APP_BASE_URL}`,
									{
										hashtag: `${hashtag.hashtag}`,
									}
								);

								setApiResponse(res.data);
								setLoading(false);
								setError(false);
							} catch (err) {
								setError(true);
								console.log(err);
							}
						}}>
						<Typography
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
