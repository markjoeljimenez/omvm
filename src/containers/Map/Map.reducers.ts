import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import { SET_LOCATIONS } from './Map.actions';

const DEFAULT_STATE = { locations: [] };

const MapReducer = (
	state = DEFAULT_STATE,
	{ type, locations, payload }: AnyAction
) => {
	switch (type) {
		case HYDRATE:
			return {
				locations: payload.map.locations,
			};

		case SET_LOCATIONS:
			return {
				...state,
				locations,
			};

		default:
			return state;
	}
};

export default MapReducer;
