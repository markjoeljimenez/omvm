import IGoogleGeocode from '../interfaces/IGoogleGeocode';

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

const getGeoJSON = async (address: string): Promise<IGoogleGeocode> => {
	const req = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
			address
		)}&region=ca&key=${KEY}`
	);

	return await req.json();
};

export default getGeoJSON;
