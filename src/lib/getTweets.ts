import queryString from 'query-string';

export interface ITweet {
	created_at: string;
	id: string;
	text: string;
}

const OPTIONS = {
	users: {
		id: ['1373531468744552448'],
	},
	optional: {
		'tweet.fields': ['created_at'],
		max_results: 40,
	},
};

export async function getTweets() {
	const users = queryString
		.stringify(OPTIONS.users, {
			arrayFormat: 'comma',
		})
		.replace(/.+?=/, '');

	const query = queryString.stringify(OPTIONS.optional, {
		arrayFormat: 'comma',
	});

	const req = await fetch(
		`https://api.twitter.com/2/users/${users}/tweets?${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
			},
		}
	);

	return await req.json();
}

export function filterTweets(tweets: ITweet[]) {
	return tweets.filter(({ text }) => {
		const isInOntario = text.includes('[ON]');
		const hasPostalCodes = text.match(/[M]\d[ABCEGHJ-NPRSTV-Z]/g);

		return isInOntario;
	});
}
