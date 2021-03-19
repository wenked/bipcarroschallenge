import React from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
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
}

const SearchBox: React.FC<SearchBoxProps> = ({
	setApiResponse,
	setRecentHashtags,
	setLoading,
}) => {
	const [inputText, setInputText] = React.useState('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		try {
			console.log('oi');
			const res = await axios.post('http://localhost:3333/hashtag', {
				hashtag: `${inputText}`,
			});
			console.log(res);
			setApiResponse(res.data);
			const recent = await axios.get('http://localhost:3333/hashtag');
			const formatedData = recent.data.allHashtags.sort(
				(a: any, b: any) => b.hashtagId - a.hashtagId
			);

			setRecentHashtags(formatedData);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
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
