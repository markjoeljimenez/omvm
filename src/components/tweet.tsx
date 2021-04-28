import { formatDistance } from 'date-fns';
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
				<img src={user?.profile_image_url} alt="" className="block" />
			</picture>
			<div className="ml-2 leading-5 flex-1">
				<p className="font-bold inline-block">{user?.name}</p>
				<p className="font-light text-sm inline-block">
					<em>
						<a
							href={`https://twitter.com/${user?.username}`}
							target="_blank"
							rel="noreferrer noopener"
							className="hover:underline"
						>
							@
							{user?.username}
						</a>
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
