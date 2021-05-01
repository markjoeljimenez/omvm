import GoogleMaps from 'google-map-react';
import _ from 'lodash';

import Marker, { IMarker } from '../../components/marker';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveTweets } from '../Timeline/Timeline.actions';

const DEFAULT_OPTIONS = {
	center: {
		lat: 43.7184034,
		lng: -79.5184847,
	},
	zoom: 11,
	region: 'ca',
};

const Map = () => {
	const { timeline, map } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const fillColor = '#4338CA';

	function handleHover(e, _map) {
		_map.data.revertStyle();
		_map.data.overrideStyle(e.feature, {
			fillColor,
			fillOpacity: 0.7,
		});
	}

	function handleClick(e, _map) {
		const postal = e.feature.getProperty('CFSAUID');

		const tweets = timeline.defaultData.filter((tweet) =>
			tweet.text
				.replace('\n', ' ')
				.replace(/https:\/\/t.co\/[A-z]\w+/g, '')
				.includes(postal)
		);

		if (tweets.length) {
			dispatch(setActiveTweets(true, tweets, postal));
		}
	}

	function handleChildClick(key, { original_address }) {
		const tweets = timeline.defaultData.filter((tweet) =>
			tweet.text
				.replace('\n', ' ')
				.replace(/https:\/\/t.co\/[A-z]\w+/g, '')
				.toLowerCase()
				.includes(original_address)
		);

		if (tweets.length) {
			dispatch(setActiveTweets(true, tweets));
		}
	}

	function handleApiLoaded(_map, maps) {
		_map.data.loadGeoJson('../data/ontario.json');

		_map.data.setStyle((feature) => ({
			fillColor,
			fillOpacity: timeline.defaultData.some((post) =>
				post.text
					.replace('\n', ' ')
					.replace(/https:\/\/t.co\/[A-z]\w+/g, '')
					.includes(feature.getProperty('CFSAUID'))
			)
				? 0.6
				: 0.2,
			strokeColor: '#fff',
			strokeOpacity: 0.6,
			strokeWeight: 1,
		}));

		_map.data.addListener('mouseover', (e) => handleHover(e, _map));
		_map.data.addListener('click', (e) => handleClick(e, _map));
	}

	return (
		<GoogleMaps
			bootstrapURLKeys={{
				key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
			}}
			options={() => ({
				fullscreenControl: false,
			})}
			defaultCenter={DEFAULT_OPTIONS.center}
			defaultZoom={DEFAULT_OPTIONS.zoom}
			yesIWantToUseGoogleMapApiInternals
			onGoogleApiLoaded={({ map: _map, maps }) =>
				handleApiLoaded(_map, maps)}
			onChildClick={handleChildClick}
		>
			{map.locations.map(
				({ id, lat, lng, formatted_address, original_address }) => (
					<Marker
						lat={lat}
						lng={lng}
						original_address={original_address}
						formatted_address={formatted_address}
						key={id}
					/>
				)
			)}
		</GoogleMaps>
	);
};

export default Map;
