"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@novahair/ui/accordion";

const faqs = [
	{
		question: "¿Necesito una derivación médica para acudir a fisioterapia?",
		answer: "No es necesario. Puedes acudir directamente a nuestra clínica sin derivación médica. Sin embargo, si tienes un seguro médico, te recomendamos consultar sus condiciones."
	},
	{
		question: "¿Cuánto dura una sesión de fisioterapia?",
		answer: "Las sesiones suelen durar entre 45 y 60 minutos, dependiendo del tratamiento específico que necesites. En la primera consulta realizamos una evaluación completa que puede extenderse un poco más."
	},
	{
		question: "¿Cuántas sesiones necesitaré?",
		answer: "El número de sesiones varía según cada caso. Tras la evaluación inicial, te proporcionaremos un plan de tratamiento personalizado con una estimación del número de sesiones necesarias."
	},
	{
		question: "¿Aceptáis seguros médicos?",
		answer: "Sí, trabajamos con las principales compañías de seguros médicos. Consulta con tu aseguradora si PhysioCare está incluido en tu póliza. También emitimos facturas para reembolso."
	},
	{
		question: "¿Qué debo llevar a mi primera cita?",
		answer: "Te recomendamos traer ropa cómoda que permita el movimiento, cualquier informe médico relevante que tengas, y tu tarjeta de seguro médico si aplica."
	},
	{
		question: "¿Puedo cancelar o modificar mi cita?",
		answer: "Sí, puedes cancelar o modificar tu cita con al menos 24 horas de antelación sin coste alguno. Puedes hacerlo llamando a nuestra clínica o a través de nuestro sistema de reservas online."
	}
];

export const FAQ = () => {
	return (
		<section className="py-24 px-4">
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Preguntas frecuentes
					</h2>
					<p className="text-xl text-muted-foreground">
						Resolvemos tus dudas más comunes
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Accordion type="single" collapsible className="space-y-4">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="border rounded-lg px-6 bg-card"
							>
								<AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground pb-6">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
};

