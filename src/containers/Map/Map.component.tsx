import GoogleMaps from 'google-map-react';

import Marker from '../../components/marker';
import { ITweet } from '../Timeline/Timeline.component';

import { IGoogleGeocodeResult } from '../../interfaces/IGoogleGeocode';
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
	const { timeline } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const fillColor = '#4338CA';

	function handleHover(e, map) {
		map.data.revertStyle();
		map.data.overrideStyle(e.feature, {
			fillColor,
			fillOpacity: 0.9,
		});
	}

	function handleClick(e, map) {
		const postal = e.feature.getProperty('CFSAUID');

		const tweets = timeline.data.filter((tweet) =>
			tweet.text
				.replace('\n', ' ')
				.replace(/https:\/\/t.co\/[A-z]\w+/g, '')
				.includes(postal)
		);

		if (tweets.length) {
			dispatch(setActiveTweets(true, tweets, postal));
		}
	}

	function handleApiLoaded(map, maps) {
		map.data.loadGeoJson('../data/ontario.json');

		map.data.setStyle((feature) => ({
			fillColor,
			fillOpacity: timeline.data.some((post) =>
				post.text
					.replace('\n', ' ')
					.replace(/https:\/\/t.co\/[A-z]\w+/g, '')
					.includes(feature.getProperty('CFSAUID'))
			)
				? 0.8
				: 0.1,
			strokeColor: '#d7e9ff',
			strokeOpacity: 0.1,
			strokeWeight: 1,
		}));

		map.data.addListener('mouseover', (e) => handleHover(e, map));
		map.data.addListener('click', (e) => handleClick(e, map));
	}

	return (
		<GoogleMaps
			bootstrapURLKeys={{ key: process.env.GA_MAPS_KEY }}
			options={() => ({
				fullscreenControl: false,
			})}
			defaultCenter={DEFAULT_OPTIONS.center}
			defaultZoom={DEFAULT_OPTIONS.zoom}
			yesIWantToUseGoogleMapApiInternals
			onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
		/>
	);
};

export default Map;
