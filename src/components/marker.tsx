export interface IMarker {
	lat?: number;
	lng?: number;
	original_address: string;
	formatted_address: string;
}

const Marker = (marker: IMarker) => (
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14.222"
			height="24.812"
			viewBox="0 0 20 34.892"
			style={{
				transform: 'translateY(-100%)',
			}}
		>
			<g transform="matrix(1.18559 0 0 1.18559 -965.773 -331.784)">
				<path
					d="M817.112 282.971c-1.258 1.343-2.046 3.299-2.015 5.139.064 3.845 1.797 5.3 4.568 10.592.999 2.328 2.04 4.792 3.031 8.873.138.602.272 1.16.335 1.21.062.048.196-.513.334-1.115.99-4.081 2.033-6.543 3.031-8.871 2.771-5.292 4.504-6.748 4.568-10.592.031-1.84-.759-3.798-2.017-5.14-1.437-1.535-3.605-2.67-5.916-2.717-2.312-.048-4.481 1.087-5.919 2.621z"
					fill="#ff4646"
					stroke="#d73534"
				/>
				<circle r="3.035" cy="288.253" cx="823.031" fill="#590000" />
			</g>
		</svg>
		{/* <p className="text-white">{text}</p> */}
	</div>
);

export default Marker;
