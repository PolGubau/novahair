export const SquiCircleFilterLayout = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="absolute bottom-0 left-0"
			version="1.1"
		>
			<title>SquiCircle Filter Layout</title>
			<defs>
				<filter id="squicircle">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
					<feColorMatrix
						in="blur"
						mode="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
						result="goo"
					/>
					<feBlend in="SourceGraphic" in2="goo" />
				</filter>
			</defs>
		</svg>
	);
};

