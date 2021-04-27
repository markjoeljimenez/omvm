import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
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
		<>
			{data.map(({ id, created_at, text, author_id }) => {
				const user = getTwitterUserInfo(includes, author_id);

				return (
					<div key={id} className="p-4 border-gray-300 border-t">
						<h2>{user?.username}</h2>
						<picture>
							<img src={user?.profile_image_url} alt="" />
						</picture>
						<p>
							{format(new Date(created_at), 'MMMM d, yyyy - p')}
						</p>
						<ReactMarkdown>{text}</ReactMarkdown>
					</div>
				);
			})}
		</>
	);
};

export default Timeline;
