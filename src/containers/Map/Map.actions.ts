import { ITweet } from '../Timeline/Timeline.component';

export const SET_ACTIVE_FEATURES = 'SET_ACTIVE_FEATURES';

export const setActiveFeature = (tweets?: ITweet[]) => ({
	type: SET_ACTIVE_FEATURES,
	tweets,
});
