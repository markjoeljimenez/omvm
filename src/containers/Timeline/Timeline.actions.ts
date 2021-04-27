import { ITwitterResponse } from './Timeline.component';

export const SET_TWEETS = 'SET_TWEETS';
export const SET_ACTIVE_TWEETS = 'SET_ACTIVE_TWEETS';

export const setTweets = (data: ITwitterResponse) => ({
	type: SET_TWEETS,
	data,
});

export const setActiveTweets = (
	active: boolean,
	tweets?: string[],
	postal?: string
) => ({
	type: SET_ACTIVE_TWEETS,
	active,
	tweets,
	postal,
});
