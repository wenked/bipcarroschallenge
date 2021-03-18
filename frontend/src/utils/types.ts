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

export interface Hashtags {
	hashtags: Result[];
}
