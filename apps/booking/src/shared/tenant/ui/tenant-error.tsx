import { Link } from "@tanstack/react-router";

export function TenantError() {
	return (
		<section className="flex items-center justify-center min-h-screen bg-background p-4">
			<div className="max-w-md w-full text-center space-y-4">
				<h1 className="text-2xl font-bold">Configuración Requerida</h1>
				<p className="text-muted-foreground">
					Esta aplicación de reservas requiere un identificador de salón (tenant
					ID).
				</p>
				<div className="bg-muted p-4 rounded-lg text-left text-sm">
					<p className="font-semibold mb-2">Accede con el parámetro tenant:</p>
					<code className="block bg-background p-2 rounded">
						{typeof window !== "undefined" ? window.location.origin : ""}
						?tenant=YOUR_SALON_ID
					</code>
				</div>

				<p className="text-xs text-muted">
					Si eres el administrador, contacta con soporte técnico.
				</p>
			</div>
		</section>
	);
}
