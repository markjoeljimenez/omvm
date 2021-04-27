import { put } from 'redux-saga/effects';
import { setTweets } from '../containers/Timeline/Timeline.actions';
import { ITwitterResponse } from '../containers/Timeline/Timeline.component';

export const INITIAL_LOAD = 'INITIAL_LOAD';

export const load = (data: ITwitterResponse) => ({
	type: INITIAL_LOAD,
	data,
});

export function* initialLoad(action) {
	const { data } = action;

	yield put(setTweets(data));
}
