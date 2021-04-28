import { PrismaClient } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITwitterResponse } from '../../containers/Timeline/Timeline.component';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// const data = await getTweets();
	const { data }: ITwitterResponse = require('../../data/tweets.json');

	const { id, author_id, created_at, text } = data[1];

	console.log('test')

	// await prisma.data.create({
	// 	data: {
	// 		id,
	// 		author_id,
	// 		created_at,
	// 		text,
	// 	},
	// });

	res.status(200);
};
