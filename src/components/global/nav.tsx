import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

// import Donate from './donate';

const Nav = () => {
	const router = useRouter();
	const [isActive, setActiveState] = useState(false);

	const onClick = () => {
		setActiveState(!isActive);
	};

	return (
		<nav className="bg-gray-100 px-8 py-4 border-r border-gray-200 font-bold flex justify-between items-center h-16">
			<div className="relative flex items-center">
				<button onClick={onClick} type="button" className="md:hidden">
					{isActive ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<g data-name="Layer 2">
								<g data-name="close">
									<rect
										width="24"
										height="24"
										transform="rotate(180 12 12)"
										opacity="0"
									/>
									<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
								</g>
							</g>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<g data-name="Layer 2">
								<g data-name="menu">
									<rect
										width="24"
										height="24"
										transform="rotate(180 12 12)"
										opacity="0"
									/>
									<rect
										x="3"
										y="11"
										width="18"
										height="2"
										rx=".95"
										ry=".95"
									/>
									<rect
										x="3"
										y="16"
										width="18"
										height="2"
										rx=".95"
										ry=".95"
									/>
									<rect
										x="3"
										y="6"
										width="18"
										height="2"
										rx=".95"
										ry=".95"
									/>
								</g>
							</g>
						</svg>
					)}
					<span className="sr-only">Menu</span>
				</button>
				<picture
					style={{
						minWidth: '6rem',
					}}
				>
					<img src="images/toronto.svg" alt="Toronto Logo" />
				</picture>
				<h1 className="absolute ml-4 md:relative font-black whitespace-no-wrap">
					Mobile Vaccination Map
				</h1>
			</div>
			<div
				className={clsx(
					'md:max-h-none overflow-hidden transition-all duration-300 space-y-6',
					isActive ? 'max-h-10' : 'max-h-0'
				)}
			>
				<ul>
					<li>
						<Link href="/">
							<a
							// className={clsx(
							// 	router.pathname === '/' && 'bg-gray-300',
							// 	'hover:bg-gray-300',
							// 	'block',
							// 	'px-4',
							// 	'py-3',
							// 	'rounded-md',
							// )}
							>
								<span className="pl-8">Map</span>
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
