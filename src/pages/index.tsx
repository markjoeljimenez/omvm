import { wrapper } from '../store';
import { getTweets } from '../lib/twitter';
import { useAppDispatch, useAppSelector } from '../hooks';

import Map from '../containers/Map/Map.component';
import Timeline from '../containers/Timeline/Timeline.component';
import {
	setActiveTweets,
	setTweets,
} from '../containers/Timeline/Timeline.actions';

interface IIndexProps {
	initialReduxState: any;
}

const Index = ({ initialReduxState }: IIndexProps) => {
	const { timeline } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const { active } = timeline;

	function handleBack() {
		dispatch(setActiveTweets(false));
	}

	return (
		<div
			style={{
				height: 'calc(100vh - 4rem)',
				width: '100%',
				position: 'relative',
			}}
		>
			<div className="absolute left-0 top-0 z-10 md:max-w-25 md:h-full overflow-y-auto bg-white">
				{active ? (
					<div className="p-4">
						<button onClick={handleBack} type="button">
							Back
						</button>
					</div>
				) : (
					<></>
				)}
				<Timeline />
			</div>
			<Map />
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store }) => {
		const { dispatch, getState } = store;
		const data = await getTweets();
		// const data = require('../data/tweets.json');

		dispatch(setTweets(data));

		return { props: { initialReduxState: getState() } };
	}
);

export default Index;
