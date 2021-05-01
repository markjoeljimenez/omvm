import _ from 'lodash';
import sub from 'date-fns/sub';
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '.prisma/client';
import { getTweets } from '../../lib/twitter';
import getGeoJSON from '../../lib/getGeoJSON';

const prisma = new PrismaClient();

async function deleteDayOldTweets() {
	await prisma.data.deleteMany({
		where: {
			created_at: {
				lt: sub(new Date(), {
					days: 1,
				}),
			},
		},
	});
}

async function createTweets(data) {
	await prisma.data.createMany({
		data,
		skipDuplicates: true,
	});
}

async function deleteDayOldLocations() {
	await prisma.geoLocation.deleteMany({
		where: {
			created_at: {
				lt: sub(new Date(), {
					days: 1,
				}),
			},
		},
	});
}

async function getLocations(data): Promise<any> {
	const locations: string[] = _.uniq(
		data
			.map((tweet) =>
				tweet.text
					.toLowerCase()
					.match(
						/\d+\s[a-z\s]+\s(st|street|blvd|boulevard|road|dr|drive|ave|avenue|centre|7)+/g
					)
			)
			.filter((tweet) => tweet)
			.flat()
	);

	const geoLocations = await Promise.all(
		locations.map(async (location) => {
			const geo = await getGeoJSON(location);

			return {
				...geo,
				address: location,
			};
		})
	);

	return geoLocations
		.map((location) => {
			const ontarioLocation = location.results.find(
				(_l) =>
					_l.address_components.find((ac) =>
						ac.types?.some(
							(type) => type === 'administrative_area_level_1'
						)
					)?.short_name === 'ON'
			);

			const { created_at }: { created_at: string } = data.find((tweet) =>
				tweet.text.toLowerCase().includes(location.address)
			);

			if (ontarioLocation) {
				return {
					id: ontarioLocation.place_id,
					original_address: location.address,
					formatted_address: ontarioLocation.formatted_address,
					lat: ontarioLocation.geometry.location.lat.toString(),
					lng: ontarioLocation.geometry.location.lng.toString(),
					created_at,
				};
			}

			return;
		})
		.filter((location) => location);
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { data } = await getTweets();

	deleteDayOldTweets();
	createTweets(data);

	const locations = await getLocations(data);

	deleteDayOldLocations();

	await prisma.geoLocation.createMany({
		data: locations,
		skipDuplicates: true,
	});

	prisma.$disconnect();

	res.end();
}
