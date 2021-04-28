import { PrismaClient } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getTweets } from '../../lib/twitter';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { data } = await getTweets();

	await prisma.data.createMany({
		data,
		skipDuplicates: true,
	});

	res.end();
};
