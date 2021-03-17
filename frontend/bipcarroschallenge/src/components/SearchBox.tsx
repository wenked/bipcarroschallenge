import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const SearchBox: React.FC = () => {
	const [inputText, setInputText] = React.useState('');

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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
