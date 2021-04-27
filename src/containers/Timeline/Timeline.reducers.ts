import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { filterTweets } from '../../lib/twitter';

import { SET_ACTIVE_TWEETS, SET_TWEETS } from './Timeline.actions';
import { ITweet } from './Timeline.component';

interface IState {
	data?: ITweet[];
	defaultData?: ITweet[];
}

const DEFAULT_STATE: IState = {};

const TimelineReducer = (
	state = DEFAULT_STATE,
	{ type, data, tweets, postal, active, payload }: AnyAction
) => {
	switch (type) {
		case HYDRATE:
			return payload.timeline;

		case SET_TWEETS:
			return {
				...state,
				...data,
				defaultData: filterTweets(data.data),
				data: filterTweets(data.data),
			};

		case SET_ACTIVE_TWEETS: {
			if (active) {
				return {
					...state,
					data: tweets,
					postal,
					active,
				};
			}

			return {
				...state,
				data: state.defaultData,
				postal: undefined,
				active,
			};
		}

		default:
			return state;
	}
};

export default TimelineReducer;
