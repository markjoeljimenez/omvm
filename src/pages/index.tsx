import { useState } from 'react';
import GoogleMaps from 'google-map-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

import getGeoJSON from '../lib/getGeoJSON';
import IPost, { IMobileLocation } from '../interfaces/IPost';
import { IGoogleGeocodeResult } from '../interfaces/IGoogleGeocode';
import Marker from '../components/global/marker';

const API = process.env.KEY;
const DEFAULT_OPTIONS = {
	center: {
		lat: 43.7184034,
		lng: -79.5184847,
	},
	zoom: 11,
	region: 'ca',
};

interface IIndexProps {
	posts: IPost[];
	mobileLocations: IMobileLocation[];
}

interface IFeature {
	postal: string;
	posts: IPost[];
	mobileLocations: IMobileLocation[];
}

const Index = ({ posts, mobileLocations }: IIndexProps) => {
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

		const locations = mobileLocations.filter(
			(location) =>
				location.postal_code.FSA === e.feature.getProperty('CFSAUID')
		);

		const transformedLocations = locations
			.map(async (location) => {
				const geoCode = await getGeoJSON(location.Address);

				return geoCode.results[0];
			})
			.filter((location) => location);

		Promise.all(transformedLocations).then((result) => {
			if (result) {
				console.log(result);
				setLocations(result);
			}
		});
	}

	function handleClick(e, map) {
		setActiveFeature({
			postal: e.feature.getProperty('CFSAUID'),
			posts: posts.filter((post) =>
				post.postal_codes.some(
					(postal_code) =>
						postal_code.FSA === e.feature.getProperty('CFSAUID')
				)
			),
			mobileLocations: mobileLocations.filter(
				(location) =>
					location.postal_code.FSA ===
					e.feature.getProperty('CFSAUID')
			),
		});
	}

	function handleApiLoaded(map, maps) {
		map.data.loadGeoJson('../data/toronto.json');

		map.data.setStyle((feature) => ({
			fillColor: '#2c5282',
			fillOpacity: posts.some((post) =>
				post.postal_codes.some(
					(postal_code) =>
						postal_code.FSA === feature.getProperty('CFSAUID')
				)
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
		<div
			style={{
				height: 'calc(100vh - 4rem)',
				width: '100%',
				position: 'relative',
			}}
		>
			<div
				className="absolute bg-white rounded-lg p-4 z-50"
				style={{
					width: '20rem',
					left: '2rem',
					top: '2rem',
				}}
			>
				{activeFeature ? (
					<div>
						<h2 className="font-black text-3xl">
							{activeFeature.postal}
						</h2>
						{activeFeature.mobileLocations.map((location) => (
							<p>{location.Address}</p>
						))}
						{/* <h3 className="mt-3 text-2xl">Posts</h3> */}
						{activeFeature.posts.map((post) => (
							<div className="mt-3 space-y-2">
								<h4>{post.Title}</h4>
								<p>
									{`${format(
										new Date(post.Start_date),
										'LLLL d, y'
									)} -
								${format(new Date(post.End_date), 'LLLL d, y')}`}
								</p>
								<ReactMarkdown className="text-sm">
									{post.Content}
								</ReactMarkdown>
							</div>
						))}
					</div>
				) : (
					<h2 className="font-black">Select an area</h2>
				)}
			</div>
			<GoogleMaps
				bootstrapURLKeys={{ key: API }}
				options={() => ({
					fullscreenControl: false,
				})}
				defaultCenter={DEFAULT_OPTIONS.center}
				defaultZoom={DEFAULT_OPTIONS.zoom}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) =>
					handleApiLoaded(map, maps)
				}
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
			{/* {activeFeature ? (
				<div
					className="absolute bg-white rounded-lg p-4"
					style={{
						minWidth: '10rem',
						right: '2rem',
						top: '50%',
					}}
				>
					{activeFeature?.postal}
					{activeFeature?.posts.map((post) => (
						<div>
							<p>{post.Title}</p>
						</div>
					))}
				</div>
			) : (
				<></>
			)} */}
		</div>
	);
};

export async function getStaticProps() {
	return {
		props: {
			test: 'test',
		},
		revalidate: 1,
	};
}

export default Index;
