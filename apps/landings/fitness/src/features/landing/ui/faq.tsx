"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@novahair/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
	{
		question: "¿Necesito experiencia previa para apuntarme?",
		answer: "¡Para nada! FitZone es para todos los niveles. Tenemos clases específicas para principiantes y nuestros entrenadores adaptan los ejercicios a tu condición física actual. Ofrecemos una sesión de orientación gratuita donde evaluamos tu nivel y te recomendamos las mejores clases para empezar."
	},
	{
		question: "¿Qué incluye la cuota mensual?",
		answer: "La cuota mensual incluye acceso ilimitado al gimnasio en horario completo, participación en todas las clases grupales (+50 semanales), uso de vestuarios con taquillas, zona de cardio y pesas, y asesoramiento básico de nuestros entrenadores. Los planes de entrenamiento personalizado tienen un coste adicional."
	},
	{
		question: "¿Hay compromiso de permanencia?",
		answer: "No, en FitZone no creemos en las permanencias obligatorias. Puedes darte de baja cuando quieras sin penalizaciones. Solo pedimos un preaviso de 15 días. Estamos seguros de que querrás quedarte por la calidad de nuestro servicio, no por obligación contractual."
	},
	{
		question: "¿Cómo funciona el sistema de reserva de clases?",
		answer: "Puedes reservar tus clases a través de nuestra web o app móvil con hasta 7 días de antelación. Las plazas son limitadas (máximo 20 personas por clase) para garantizar atención personalizada. Si no puedes asistir, puedes cancelar hasta 2 horas antes sin penalización."
	},
	{
		question: "¿Ofrecéis entrenamiento personalizado?",
		answer: "Sí, todos nuestros entrenadores ofrecen sesiones de entrenamiento personal. Puedes contratar packs de 5, 10 o 20 sesiones con descuentos progresivos. También diseñamos planes de entrenamiento personalizados que puedes seguir por tu cuenta, con revisiones mensuales incluidas."
	},
	{
		question: "¿Qué medidas de higiene y seguridad tenéis?",
		answer: "La limpieza es nuestra prioridad. Limpiamos y desinfectamos el equipamiento varias veces al día, proporcionamos gel desinfectante y toallas limpias, y contamos con ventilación y purificación de aire continua. Los vestuarios se limpian cada 2 horas y disponemos de duchas individuales."
	},
	{
		question: "¿Puedo probar antes de apuntarme?",
		answer: "¡Por supuesto! Ofrecemos 7 días de prueba gratuita sin compromiso. Durante esta semana puedes usar todas las instalaciones, asistir a las clases que quieras y conocer a nuestro equipo. También incluye una sesión de valoración física gratuita con uno de nuestros entrenadores."
	},
	{
		question: "¿Tenéis parking o cómo llego?",
		answer: "Estamos en pleno centro de Madrid (Gran Vía, 125) con excelentes conexiones de metro (Callao, Gran Vía) y autobús. Tenemos acuerdo con el parking público de la calle Jacometrezo (50m) con tarifa reducida para socios. También disponemos de aparcamiento para bicicletas en la entrada."
	}
];

export const FAQ = () => {
	return (
		<section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-4 mb-16"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
						Preguntas frecuentes
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Resolvemos todas tus dudas sobre FitZone
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
								className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow"
							>
								<AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
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

