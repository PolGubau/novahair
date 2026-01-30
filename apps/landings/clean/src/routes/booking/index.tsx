import { createFileRoute } from '@tanstack/react-router';
import { BookingApp } from '@novahair/booking-app';

export const Route = createFileRoute('/booking/')({
	component: BookingPage,
});

function BookingPage() {
	const tenantId = import.meta.env.VITE_TENANT_ID || 'default-tenant'; // O de donde lo obtengas
	return <BookingApp tenantId={tenantId} />;
}