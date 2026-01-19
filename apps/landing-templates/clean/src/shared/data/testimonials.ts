export type Testimonial = {
	src?: string;
	name: string;
	service: string;
	body: string;
};

export const testimonials: Testimonial[] = [
	{
		src: "/images/1.webp",
		name: "Pablo Navarro",
		service: "Corte de cabello",
		body: "Excelente servicio y atención personalizada. ¡Muy recomendable!",
	},
	{
		name: "María López",
		service: "Coloración",
		body: "Me encantó el ambiente y el profesionalismo del equipo. Volveré seguro.",
	},
	{
		src: "/images/3.webp",
		name: "Juan Pérez",
		service: "Corte de cabello",
		body: "Gran experiencia, salí muy satisfecho con mi nuevo look.",
	},
	{
		src: "/images/4.webp",
		name: "Ana García",
		service: "Corte de cabello",
		body: "El mejor lugar para cuidar tu cabello. ¡Me siento renovada!",
	},
	{
		name: "Luis Martínez",
		service: "Corte de cabello",
		body: "Un servicio excepcional, definitivamente volveré por más.",
	},
	{
		src: "/images/6.webp",
		name: "Laura Fernández",
		service: "Tratamiento capilar",
		body: "Un lugar acogedor y un equipo muy profesional. ¡Recomendado!",
	},
];
