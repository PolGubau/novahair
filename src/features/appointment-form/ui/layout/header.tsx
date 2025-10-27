import { Link } from "@tanstack/react-router";

export const AppointmentFormHeader = () => {
	return (
		<header className="flex gap-2 items-center p-4">
			<Link to="/">&#8592; Home</Link>
			<h1 className="text-xl">Peluquerías HDMI</h1>

			<div className="flex justify-end gap-2 items-center">
				<button type="button">Guardar</button>
			</div>
		</header>
	);
};
