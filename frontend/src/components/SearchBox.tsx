import React from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton, MenuItem, Select } from '@material-ui/core';
import { ApiPostResponse, Hashtags } from '../utils/types';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

interface SearchBoxProps {
	setRecentHashtags: React.Dispatch<
		React.SetStateAction<Hashtags[] | undefined>
	>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setApiResponse: React.Dispatch<
		React.SetStateAction<ApiPostResponse | undefined>
	>;

	setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
	setApiResponse,
	setRecentHashtags,
	setLoading,
	setError,
}) => {
	const [inputText, setInputText] = React.useState('');
	const [count, setCount] = React.useState(15);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		try {
			console.log(process.env.REACT_APP_BASE_URL);
			const res = await axios.post(`${process.env.REACT_APP_BASE_URL}`, {
				hashtag: `${inputText}`,
				count: count,
			});
			console.log(res);
			setApiResponse(res.data);
			const recent = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
			const formatedData = recent.data.allHashtags.sort(
				(a: any, b: any) => b.hashtagId - a.hashtagId
			);

			setRecentHashtags(formatedData);
			setError(false);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setError(true);
		}
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setCount(event.target.value as number);
	};

	return (
		<div>
			<form
				onSubmit={onSubmit}
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					width: '400px',
				}}>
				<TextField
					required
					onChange={onChange}
					label='Hashtag'
					size='medium'
					fullWidth
				/>
				<Select
					style={{ marginTop: '16px', marginLeft: '10px' }}
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={count}
					onChange={handleChange}>
					<MenuItem value={15}>15</MenuItem>
					<MenuItem value={30}>30</MenuItem>
					<MenuItem value={45}>45</MenuItem>
				</Select>
				<IconButton
					type='submit'
					style={{ marginLeft: '10px', marginTop: '20px' }}>
					<SearchIcon />
				</IconButton>
			</form>
		</div>
	);
};

export default SearchBox;
