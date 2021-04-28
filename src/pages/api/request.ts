import sub from 'date-fns/sub';
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '.prisma/client';
import { getTweets } from '../../lib/twitter';

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

export default async function (req: NextApiRequest, res: NextApiResponse) {
	deleteDayOldTweets();

	const { data } = await getTweets();

	await prisma.data.createMany({
		data,
		skipDuplicates: true,
	});

	prisma.$disconnect();

	res.end();
}
