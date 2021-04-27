/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Sentry from '@sentry/browser';
import { DefaultSeo } from 'next-seo';
import { wrapper } from '../store';

import Dashboard from '../layouts/dashboard';

import '../styles/styles.scss';

interface IApp {
	Component: any;
	pageProps: any;
}

const App = ({ Component, pageProps }: IApp) => {
	if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
		});
	}

	return (
		<>
			<DefaultSeo
				title="Toronto Mobile Vaccination Map"
				description="Find out where Toronto's mobile vaccinations are happening."
			/>
			<Dashboard>
				<Component {...pageProps} />
			</Dashboard>
		</>
	);
};

export default wrapper.withRedux(App);
