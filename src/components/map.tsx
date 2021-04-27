import { useState } from 'react';
import GoogleMaps from 'google-map-react';
import { ITweet } from '../lib/getTweets';

import Marker from '../components/marker';

import { IGoogleGeocodeResult } from '../interfaces/IGoogleGeocode';

interface IMap {
	posts: ITweet[];
}

interface IFeature {
	posts: ITweet[];
}

const DEFAULT_OPTIONS = {
	center: {
		lat: 43.7184034,
		lng: -79.5184847,
	},
	zoom: 11,
	region: 'ca',
};

const Map = ({ posts }: IMap) => {
	const [locations, setLocations] = useState<
		IGoogleGeocodeResult[] | undefined
	>();
	const [activeFeature, setActiveFeature] = useState<IFeature | undefined>();

	function handleHover(e, map) {
		map.data.revertStyle();
		map.data.overrideStyle(e.feature, {
			fillColor: '#2c5282',
			fillOpacity: 0.8,
		});
	}

	function handleClick(e, map) {
		console.log(e.feature.getProperty('CFSAUID'));
		// setActiveFeature({
		// 	postal: e.feature.getProperty('CFSAUID'),
		// 	posts: posts.filter((post) =>
		// 		post.postal_codes.some(
		// 			(postal_code) =>
		// 				postal_code.FSA === e.feature.getProperty('CFSAUID')
		// 		)
		// 	),
		// 	mobileLocations: mobileLocations.filter(
		// 		(location) =>
		// 			location.postal_code.FSA ===
		// 			e.feature.getProperty('CFSAUID')
		// 	),
		// });
	}

	function handleApiLoaded(map, maps) {
		map.data.loadGeoJson('../data/toronto.json');

		map.data.setStyle((feature) => ({
			fillColor: '#2c5282',
			fillOpacity: posts.some((post) =>
				post.text
					.replace('\n', ' ')
					.includes(feature.getProperty('CFSAUID'))
			)
				? 0.6
				: 0.2,
			strokeColor: '#2c5282',
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
		>
			{locations?.map(({ geometry, place_id }) => (
				<Marker
					key={place_id}
					lat={geometry.location.lat}
					lng={geometry.location.lng}
					text="test"
				/>
			))}
		</GoogleMaps>
	);
};

export default Map;
