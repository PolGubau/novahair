export type Testimonial = {
	name: string;
	username: string;
	body: string;
	img: string;
};

export const testimonials: Testimonial[] = [
	{
		name: "María García Rodríguez",
		username: "Corredora amateur",
		body: "Después de mi lesión de rodilla corriendo el maratón de Barcelona, el Dr. Carlos me ayudó a recuperarme completamente en 3 meses. Su tratamiento combinó terapia manual, ejercicios específicos y tecnología de última generación. Ahora puedo volver a correr sin dolor. ¡Increíble profesionalidad!",
		img: "https://avatar.vercel.sh/maria",
	},
	{
		name: "Carlos Ruiz Martín",
		username: "Ingeniero",
		body: "Llevaba 2 años con dolor de espalda crónico por mi trabajo de oficina. En PhysioCare no solo trataron el dolor, sino que me enseñaron ejercicios y posturas para prevenir futuras lesiones. El ambiente es muy acogedor y profesional. Totalmente recomendable.",
		img: "https://avatar.vercel.sh/carlos",
	},
	{
		name: "Laura Martínez Sanz",
		username: "Profesora de yoga",
		body: "La Dra. Ana López es excepcional. Su enfoque holístico y la terapia manual personalizada han sido clave para mi recuperación de una lesión de hombro. Los ejercicios que me dio los sigo haciendo como prevención. Un 10 en atención y resultados.",
		img: "https://avatar.vercel.sh/laura",
	},
	{
		name: "Javier López Fernández",
		username: "Jugador de pádel",
		body: "Como deportista amateur, necesitaba un centro especializado en lesiones deportivas. PhysioCare superó mis expectativas con su enfoque integral: tratamiento, prevención y readaptación deportiva. Volví a la pista en tiempo récord.",
		img: "https://avatar.vercel.sh/javier",
	},
	{
		name: "Ana Sánchez Torres",
		username: "Administrativa",
		body: "Excelente atención desde la primera consulta. El Dr. Miguel me explicó todo el proceso de recuperación de mi tendinitis y los resultados fueron visibles desde las primeras sesiones. El equipo es muy atento, profesional y las instalaciones son modernas y limpias.",
		img: "https://avatar.vercel.sh/ana",
	},
	{
		name: "Pedro Fernández Gil",
		username: "Jubilado",
		body: "Después de mi cirugía de cadera, la rehabilitación en PhysioCare fue fundamental. El equipo adaptó los ejercicios a mi edad y condición física. Recuperé la movilidad mucho más rápido de lo que esperaba mi traumatólogo. Muy agradecido con todo el equipo.",
		img: "https://avatar.vercel.sh/pedro",
	},
];

