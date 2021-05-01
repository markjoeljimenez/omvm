export interface IGoogleGeocodeResult {
	formatted_address: string;
	geometry: {
		location: {
			lat: string;
			lng: string;
		};
	};
	place_id: string;
}

export default interface IGoogleGeocode {
	results: IGoogleGeocodeResult[];
}
