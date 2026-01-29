import { createFileRoute } from '@tanstack/react-router'
 import { z } from 'zod'
import { StaffSelector } from '~/features/staff/ui/selector'

const paramsSchema = z.object({
  serviceId: z.string(),
})

export const Route = createFileRoute('/choose-staff/')({
  component: RouteComponent,
  validateSearch:  (paramsSchema),

})

function RouteComponent() {
  const { serviceId } = Route.useSearch()
  return (
    <section className="flex flex-col gap-4 p-4">
      <StaffSelector serviceId={serviceId} />
    </section>
  )
}
