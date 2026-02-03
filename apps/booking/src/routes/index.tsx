import { BookingApp } from '@novahair/booking-app';
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { MainLayout } from '~/app/layouts/main';
import { useTenantId } from "~/shared/tenant";

const searchSchema = z.object({
	serviceId: z.string().optional(),
	tenantId: z.string().optional(),
	staffId: z.string().optional(),
});

export const Route = createFileRoute("/")({
	validateSearch: searchSchema,
	ssr: false,
	component: RouteComponent,
	
});

function RouteComponent() {
	const tenantId  = useTenantId();

	return  <MainLayout>
		<BookingApp tenantId={tenantId} />
	</MainLayout>
 }
