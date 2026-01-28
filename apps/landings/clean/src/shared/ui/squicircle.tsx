// to use the filter just add this to your layout.tsx
// <SkiperSquiCircleFilterLayout/>
// {children}

// on element you need to add squicircle just add the filter id SkiperSquiCircleFilter
//<div style={{filter: "url(#squicircle)"}}></div>

// thats it you can use the filter now no extra rerenders no complications just pure css filter

export const SquiCircleFilterLayout = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="absolute bottom-0 left-0"
			version="1.1"
		>
			<title>Skiper SquiCircle Filter Layout</title>
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
