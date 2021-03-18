import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Hashtags, RecentsHashtags } from '../utils/types';
import axios from 'axios';

interface SearchBoxProps {
	setRecentHashtags: React.Dispatch<
		React.SetStateAction<RecentsHashtags | undefined>
	>;
	setApiResponse: React.Dispatch<React.SetStateAction<Hashtags | undefined>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
	setApiResponse,
	setRecentHashtags,
}) => {
	const [inputText, setInputText] = React.useState('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('teste');
		const recent = await axios.get('http://localhost:3333/hashtag');
		const res = await axios.post('http://localhost:3333/hashtag', {
			hashtag: `${inputText}`,
		});
		console.log(recent);
		setApiResponse(res.data);
		setRecentHashtags(recent.data);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	return (
		<div>
			<form
				onSubmit={onSubmit}
				style={{ display: 'flex', flexDirection: 'row' }}>
				<TextField
					required
					onChange={onChange}
					label='Hashtag'
					size='medium'
					style={{ color: '#d8d4cf' }}
					fullWidth
				/>
				<Button type='submit' variant='outlined' style={{ marginLeft: '10px' }}>
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchBox;
