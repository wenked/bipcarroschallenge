import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Hashtags } from '../utils/types';
import axios from 'axios';

interface SearchBoxProps {
	setApiResponse: React.Dispatch<React.SetStateAction<Hashtags | undefined>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ setApiResponse }) => {
	const [inputText, setInputText] = React.useState('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const res = await axios.post(
			'https://cors-anywhere.herokuapp.com/http://localhost:3333/hashtag',
			{
				hashtag: `${inputText}`,
			}
		);
		setApiResponse(res.data);
		console.log(res);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<TextField required onChange={onChange} label='Hashtag' size='medium' />
				<Button type='submit' variant='outlined' style={{ marginLeft: '10px' }}>
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchBox;