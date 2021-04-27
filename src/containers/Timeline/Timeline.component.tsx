import Tweet from '../../components/tweet';
import { useAppSelector } from '../../hooks';
import { getTwitterUserInfo } from '../../lib/twitter';

export interface ITweet {
	author_id: string;
	created_at: string;
	id: string;
	text: string;
}

export interface ITwitterUser {
	id: string;
	name: string;
	username: string;
	profile_image_url: string;
}

export interface ITwitterResponse {
	data: ITweet[];
	includes: ITwitterUser[];
}

const Timeline = () => {
	const { timeline } = useAppSelector((state) => state);
	const { data, includes, activeTweets, postal } = timeline;

	return (
		<div className="max-h-10 overflow-auto md:max-h-none">
			{data.map(({ id, created_at, text, author_id }) => {
				const user = getTwitterUserInfo(includes, author_id);

				return (
					<div key={id} className="p-4 border-gray-300 border-t">
						<Tweet
							user={user}
							created_at={created_at}
							text={text}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Timeline;
