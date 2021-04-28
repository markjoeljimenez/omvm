import queryString from 'query-string';
import {
	ITweet,
	ITwitterResponse,
	ITwitterUser,
} from '../containers/Timeline/Timeline.component';

const OPTIONS = {
	users: {
		id: ['1373531468744552448'],
	},
	optional: {
		expansions: 'author_id',
		'user.fields': ['id', 'name', 'profile_image_url'],
		'tweet.fields': ['created_at'],
		max_results: 5,
	},
};

export async function getTweets(): Promise<ITwitterResponse> {
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

export function filterTweets(tweets?: ITweet[]) {
	if (tweets) {
		return tweets.filter(({ text }) => {
			const isInOntario = text.includes('[ON]');
			const hasPostalCodes = text.match(/[M]\d[ABCEGHJ-NPRSTV-Z]/g);

			return isInOntario;
		});
	}
}

export function getTwitterUserInfo(
	{ users }: { users: ITwitterUser[] },
	id: string
) {
	return users.find((user) => user.id === id);
}
