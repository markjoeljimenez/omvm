export interface IGoogleGeocodeResult {
	formatted_address: string;
	geometry: {
		location: {
			lat: number;
			lng: number;
		};
	};
	place_id: string;
}

export default interface IGoogleGeocode {
	results: IGoogleGeocodeResult[];
}
