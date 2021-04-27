import { SET_ACTIVE_FEATURES } from './Map.actions';

const DEFAULT_STATE = {};

const MapReducer = (state = DEFAULT_STATE, { type, features }) => {
	switch (type) {
		case SET_ACTIVE_FEATURES:
			return {
				...state,
				features,
			};

		default:
			return state;
	}
};

export default MapReducer;
