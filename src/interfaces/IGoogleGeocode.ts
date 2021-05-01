export interface IGoogleGeocodeResult {
	address: string;
	address_components: {
		long_name: string;
		short_name: string;
		types: string[];
	}[];
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
