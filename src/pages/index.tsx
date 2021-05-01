import { PrismaClient } from '@prisma/client';

import { wrapper } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';

import Map from '../containers/Map/Map.component';
import { setLocations } from '../containers/Map/Map.actions';

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
			<div className="absolute left-0 top-0 z-10 md:max-w-25 md:h-full overflow-y-auto bg-white w-full">
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

const prisma = new PrismaClient();

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store }) => {
		const data = await prisma.data.findMany({
			orderBy: [
				{
					created_at: 'desc',
				},
			],
		});
		const users = await prisma.author.findMany();
		const locations = await prisma.geoLocation.findMany();

		const { dispatch, getState } = store;

		dispatch(
			setTweets({
				data: JSON.parse(JSON.stringify(data)),
				includes: {
					users,
				},
			})
		);

		// await fetch(`${process.env.HOST}/api/request`);

		dispatch(setLocations(JSON.parse(JSON.stringify(locations))));

		prisma.$disconnect();

		return { props: { initialReduxState: getState() } };
	}
);

export default Index;
