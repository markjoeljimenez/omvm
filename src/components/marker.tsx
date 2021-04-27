interface IMarker {
	lat?: number;
	lng?: number;
	text: string;
}

const Marker = ({ lat, lng, text }: IMarker) => (
	<div>
		<p className="text-white">{text}</p>
	</div>
);

export default Marker;
