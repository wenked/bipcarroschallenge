export interface TwitterUser {
	twitter: string;
	user: string;
	profile_img_url: string;
	created_at: string;
}

export interface Result {
	resultId: number;
	created_at: string;
	tweet_date: string;
	content: string;
	twitterUser: TwitterUser;
}

export interface Hashtag {
	hashtagId: number;
	hashtag: string;
	created_at: string;
}

export interface Hashtags {
	hashtagId: number;
	hashtag: string;
	created_at: string;
	results: Result[];
}

export interface ResultPostApiResponse {
	tweet_date: string;
	tweet: string;
	user: string;
	twitter: string;
	profile_img_url: string;
}

export interface ApiPostResponse {
	hashtagId: number;
	hashtag: string;
	created_at: string;
	results: ResultPostApiResponse[];
}
