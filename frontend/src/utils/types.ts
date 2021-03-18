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
	hashtag: Hashtag;
	results: Result[];
}

export interface RecentsHashtags {
	hashtags: Hashtags[];
}
