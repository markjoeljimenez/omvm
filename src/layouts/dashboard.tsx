import Nav from '../components/global/nav';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => (
	<div className="text-blue-800 flex flex-col relative">
		<Nav />

		{/* <main className="w-full">{children}</main> */}
		{children}
	</div>
);

export default Dashboard;
