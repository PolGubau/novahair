import { createFileRoute } from '@tanstack/react-router';
import { BookingApp } from '@novahair/booking-app';

export const Route = createFileRoute('/booking/')({
	component: BookingPage,
});


function BookingPage() {


  const tenantId = import.meta.env.VITE_TENANT_ID;
  
  if (!tenantId) {
    return <div>Please provide a tenant ID</div>;
  }

  return <section className='p-4 flex flex-col gap-4'>
    <header>
      <h1 className='text-2xl font-bold'>Peluquería Novahair</h1>
    </header>
    <BookingApp tenantId={tenantId} />
    </section>
}