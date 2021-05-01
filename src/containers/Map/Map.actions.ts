import { ITweet } from '../Timeline/Timeline.component';

export const SET_ACTIVE_FEATURES = 'SET_ACTIVE_FEATURES';
export const SET_LOCATIONS = 'SET_LOCATIONS';

export const setActiveFeature = (tweets?: ITweet[]) => ({
	type: SET_ACTIVE_FEATURES,
	tweets,
});

export const setLocations = (locations) => ({
	type: SET_LOCATIONS,
	locations,
});
