# NovaHair Client

A modern, type-safe client for the NovaHair API with excellent developer experience.

## Features

- **Layered Architecture**: Clean separation between domain, infrastructure, and presentation layers
- **Type Safety**: Full TypeScript support with auto-generated types
- **React Query Integration**: Optimized caching and state management
- **Anonymous Sessions**: Support for storing appointments without login
- **Unified Client**: Organized API access through a single client object

## Quick Start

```typescript
import { client } from '@novahair/client';

// Using the unified client
const { useCustomers, useCustomerActions } = client.customers;

// Or import directly
import { useCustomers, useCustomerActions } from '@novahair/client';
```

## Anonymous Appointments

For landing pages without authentication, appointments are automatically stored locally with full type safety:

```typescript
import { useAppointmentActions, useStoredAppointments, type StoredAppointment } from '@novahair/client';

// In booking form
const { create } = useAppointmentActions(tenantId);

// Create appointment (automatically stored locally with types)
await create.mutateAsync({
  serviceId: 'service-1',
  staffId: 'staff-1',
  customer: { name: 'John Doe', email: 'john@example.com', phone: '123456789' },
  startsAt: '2024-01-01T10:00:00Z',
  notes: 'First visit'
});

// In landing page - fully typed
const { appointments, hasAppointments } = useStoredAppointments();
// appointments is StoredAppointment[]
```

## API Structure

Each feature follows the same pattern:

- `use[Feature]s()` - List/query hook
- `use[Feature]()` - Single item query hook
- `use[Feature]Actions()` - Mutation hooks (create, update, delete)

## Available Features

- **Appointments**: Booking management with anonymous session support
- **Availability**: Time slot checking
- **Customers**: Customer management
- **Staff**: Staff member management
- **Staff Assignments**: Service-to-staff assignments
- **Staff Schedule**: Staff calendar management
- **Tenants**: Organization management
- **Working Hours**: Staff working hours

## Examples

### Complete Booking Flow

```typescript
import { useAppointmentActions, useStoredAppointments, type StoredAppointment } from '@novahair/client';
import { config } from '@novahair/utils';

function BookingForm() {
  const { create } = useAppointmentActions(config.tenantId);

  const handleSubmit = async (formData) => {
    try {
      await create.mutateAsync({
        serviceId: formData.serviceId,
        staffId: formData.staffId,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        startsAt: formData.dateTime,
        notes: formData.notes,
      });
      // Success! Appointment is stored locally and in backend
    } catch (error) {
      // Handle error
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

function LandingPage() {
  const { appointments, hasAppointments }: { appointments: StoredAppointment[], hasAppointments: boolean } = useStoredAppointments();

  if (!hasAppointments) {
    return <div>No tienes citas reservadas</div>;
  }

  return (
    <div>
      <h2>Tus citas reservadas:</h2>
      {appointments.map(appointment => (
        <div key={appointment.id}>
          <p>Servicio: {appointment.serviceId}</p>
          <p>Fecha: {new Date(appointment.startsAt).toLocaleString()}</p>
          <p>Cliente: {appointment.customer.name}</p>
          <p>Estado: {appointment.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using the Unified Client

```typescript
import { client } from '@novahair/client';

// Access all features through the client object
const { useCustomers, useCustomerActions } = client.customers;
const { useStaff, useStaffActions } = client.staff;
const { useAppointments, useAppointmentActions } = client.appointments;

// Or import individual hooks
import { useCustomers, useCustomerActions } from '@novahair/client';
```

## Best Practices

1. **Use the unified client** for better organization
2. **Handle loading and error states** in your components
3. **Anonymous appointments** are automatically managed
4. **Type safety** is enforced throughout the API

## Architecture Notes

### Avoiding Circular Dependencies

The client is designed to avoid circular dependencies:

- **Utils package**: Contains basic utilities and minimal types (`StoredAppointment`)
- **Client package**: Contains full domain types and API logic
- **No circular imports**: Utils doesn't import from client, maintaining clean dependencies

### Session Management

Anonymous users get a unique session ID stored in localStorage. Appointments are:
- Saved to the backend with the session ID
- Stored locally for immediate access with full TypeScript support
- Recoverable across page refreshes
- Isolated per session (not shared between users)

 
