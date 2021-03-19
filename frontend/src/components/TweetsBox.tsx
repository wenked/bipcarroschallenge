import React from 'react';
import { ApiPostResponse } from '../utils/types';
import Tweet from './Tweet';

interface TweetsBoxProps {
	apiResponse: ApiPostResponse | undefined;
}

export const TweetsBox: React.FC<TweetsBoxProps> = ({ apiResponse }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '40px',
				width: '40%',
			}}>
			{apiResponse?.results.map((tweet, i) => {
				return <Tweet tweet={tweet} key={i} />;
			})}
		</div>
	);
};
