import { Input } from "@/shared/ui/input";

export const AppointmentForm = () => {
	return (
		<form className="flex flex-col gap-4">
			<Input label="Nombre" placeholder="Antonio Lobato" />
			<Input label="Correo Electrónico" placeholder="lobato@tucoche.com" />


      
		</form>
	);
};
