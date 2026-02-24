import { BookingApp } from "@novahair/booking-app";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/booking/")({
	component: RouteComponent,
});

function RouteComponent() {
	const tenantId = import.meta.env.VITE_TENANT_ID;

	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="text-center mb-12">
					<h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
						Reserva tu clase
					</h1>
					<p className="text-xl text-muted-foreground">
						Elige tu clase favorita y empieza tu transformación
					</p>
				</div>
				<BookingApp tenantId={tenantId} />
			</div>
		</div>
	);
}

