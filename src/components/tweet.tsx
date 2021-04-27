import ReactMarkdown from 'react-markdown';
import { format, formatDistance } from 'date-fns';
import Linkify from 'react-linkify';

import { ITwitterUser } from '../containers/Timeline/Timeline.component';

interface ITWeet {
	user?: ITwitterUser;
	created_at: string;
	text: string;
}

const Tweet = ({ user, created_at, text }: ITWeet) => (
	<>
		<div className="flex items-center">
			<picture className="w-12 h-12 rounded-full border-blue-400 border block overflow-hidden">
				<img
					src={user?.profile_image_url}
					alt=""
					className="block w-full"
				/>
			</picture>
			<div className="ml-2 leading-5">
				<p className="font-bold">{user?.name}</p>
				<p className="font-light text-sm">
					<em>
						@
						{user?.username}
						{' '}
						&middot;
						{' '}
						{formatDistance(new Date(created_at), new Date(), {
							addSuffix: true,
						})}
						{/* <p>{format(new Date(created_at), 'MMMM d, yyyy - p')}</p> */}
					</em>
				</p>
			</div>
		</div>
		<div className="mt-3 prose prose-sm prose-blue">
			<Linkify
				componentDecorator={(decoratedHref, decoratedText, key) => (
					<a target="blank" href={decoratedHref} key={key}>
						{decoratedText}
					</a>
				)}
			>
				{text}
			</Linkify>
			{/* <ReactMarkdown>{text}</ReactMarkdown> */}
		</div>
	</>
);

export default Tweet;
