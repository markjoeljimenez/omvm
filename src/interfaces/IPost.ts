export interface IMobileLocation {
	Title: string;
	Address: string;
	postal_code: {
		FSA: string;
	};
}

export interface IPostalCode {
	Title: string;
	FSA: string;
	mobile_locations: IMobileLocation[];
}

export default interface IPost {
	id: number;
	Title: string;
	Start_date: string | Date;
	End_date: string | Date;
	Content: string;
	// published_at: string;
	// created_at: string;
	// updated_at: string;
	postal_codes: IPostalCode[];
	mobile_locations: IMobileLocation[];
}
