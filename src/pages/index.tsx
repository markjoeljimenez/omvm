import { filterTweets, ITweet } from '../lib/getTweets';

import Map from '../components/map';

interface IIndexProps {
	posts: ITweet[];
}

const Index = ({ posts }: IIndexProps) => {
	console.log(posts);

	return (
		<div
			style={{
				height: 'calc(100vh - 4rem)',
				width: '100%',
				position: 'relative',
			}}
		>
			<Map posts={posts} />
		</div>
	);
};

export async function getStaticProps() {
	// const { data } = await getTweets();

	const data = require('../data/tweets.json');

	return {
		props: {
			posts: filterTweets(data),
		},
		revalidate: 1,
	};
}

export default Index;
