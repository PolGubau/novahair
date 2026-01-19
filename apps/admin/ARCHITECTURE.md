# Arquitectura del Admin Panel - Nova Hair

## Principios de Organización

### Feature-Sliced Design
El proyecto sigue una arquitectura basada en features con la siguiente estructura:

```
features/
  <feature-name>/
    domain/          # Tipos de negocio, DTOs, entidades
    infra/           # Acceso a datos (repositories)
    hooks/           # React hooks con lógica de estado
    ui/              # Componentes visuales
```

### Shared Layer
Recursos compartidos entre features:

```
shared/
  constants.ts     # Configuración global
  lib/             # Utilidades reutilizables
    api-utils.ts   # Construcción de URLs
    generic-fetch.ts # Cliente HTTP
    api-error.ts   # Manejo de errores
  types/           # Tipos compartidos
  ui/              # Componentes UI reutilizables
```

## Capa de Datos (Repository Pattern)

### AbstractRepository
El tipo `AbstractRepository` define el contrato estándar para acceso a datos:

```typescript
export type AbstractRepository<T, CreateDto = Partial<T>> = {
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T | null>;
  create: (payload: CreateDto) => Promise<T>;
  update: (id: string, payload: Partial<CreateDto>) => Promise<T>;
  delete: (id: string) => Promise<void>;
};
```

**Cuándo usarlo:**
- ✅ Como referencia de documentación para mantener consistencia
- ✅ Como tipo base cuando todos los métodos CRUD son necesarios
- ❌ NO como clase abstracta a extender (evitar OOP innecesario)
- ❌ NO forzar implementación si el feature necesita métodos custom

**Ejemplo de uso correcto:**
```typescript
// staff/infra/repository.ts
export type StaffRepository = AbstractRepository<Staff, StaffCreateDto>;

export const staffRepository: StaffRepository = {
  list: async () => genericFetch<Staff[]>(buildTenantUrl("staff")),
  get: async (id) => genericFetch<Staff>(buildApiUrl(`staff/${id}`)),
  create: async (payload) => genericFetch<Staff>(buildApiUrl("staff"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }),
  update: async (id, payload) => genericFetch<Staff>(buildApiUrl(`staff/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }),
  delete: async (id) => {
    await genericFetch(buildApiUrl(`staff/${id}`), { method: "DELETE" });
  },
};
```

**Ejemplo con métodos custom:**
```typescript
// appointments/infra/repository.ts
export type AppointmentRepository = {
  list: (params: ListAppointmentsParams) => Promise<Appointment[]>;
  create: (data: CreateAppointmentParams) => Promise<SummarizedAppointment>;
  update: (id: string, data: UpdateAppointmentParams) => Promise<Appointment>;
  delete: (id: string) => Promise<void>;
  // Custom method - no sigue AbstractRepository
  listByDate: (date: string) => Promise<Appointment[]>;
};
```

## Utilidades de API (Eliminando Duplicación)

### Problema: Duplicación de buildUrl
Antes cada repository duplicaba la lógica de construcción de URLs:

```typescript
// ❌ MAL: Duplicado en cada repository
const BASE_URL = import.meta.env.VITE_BASE_URL;
const buildUrl = (path: string) => `${BASE_URL}/v1/${path}`;
```

### Solución: Centralización en api-utils.ts

```typescript
// shared/lib/api-utils.ts
import { config } from "../constants";

export function buildApiUrl(
  path: string,
  params?: Record<string, string | undefined>,
): string {
  const url = new URL(`${config.baseUrl}/${config.apiVersion}/${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }
  return url.toString();
}

export function buildTenantUrl(
  path: string,
  params?: Record<string, string | undefined>,
): string {
  return buildApiUrl(`tenants/${config.tenantId}/${path}`, params);
}
```

**Beneficios:**
- ✅ DRY: Una única fuente de verdad
- ✅ Facilita cambios globales (ej: cambiar versión de API)
- ✅ Type-safe: TypeScript ayuda con autocomplete
- ✅ Manejo consistente de query params

**Uso en repositories:**
```typescript
import { buildApiUrl, buildTenantUrl } from "~/shared/lib/api-utils";

// Para recursos específicos del tenant
const staff = await genericFetch<Staff[]>(buildTenantUrl("staff"));

// Para recursos globales
const service = await genericFetch<Service>(buildApiUrl(`services/${id}`));

// Con query params
const appointments = await genericFetch<Appointment[]>(
  buildTenantUrl("appointments", { from: "2024-01-01", to: "2024-01-31" })
);
```

## Manejo de Errores

### ApiError Class
Clase personalizada para errores de API con métodos helper:

```typescript
export class ApiError extends Error {
  statusCode?: number;
  endpoint: string;

  isNetworkError(): boolean {
    return !this.statusCode;
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}
```

### Generic Fetch
Cliente HTTP centralizado con manejo de errores:

```typescript
export async function genericFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        String(input),
      );
    }

    // Manejo de respuestas vacías (DELETE)
    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      String(input),
    );
  }
}
```

## Antipatrones a Evitar

### 1. Capa de API duplicada
❌ **MAL:**
```
features/staff/
  infra/
    api.ts         # Funciones que llaman a fetch
    repository.ts  # Funciones que llaman a api.ts
```

✅ **BIEN:**
```
features/staff/
  infra/
    repository.ts  # Único punto de acceso a datos
```

### 2. Endpoints centralizados
❌ **MAL:**
```typescript
// shared/constants.ts
export const endpoints = {
  staff: { list: '/staff', get: (id) => `/staff/${id}` },
  services: { list: '/services', ... },
  // ...100 líneas más
};
```

✅ **BIEN:**
```typescript
// shared/lib/api-utils.ts
export const buildApiUrl = (path: string) => ...

// features/staff/infra/repository.ts
list: () => genericFetch(buildTenantUrl("staff"))
```

**Razón:** Los endpoints son específicos de cada feature, centralizarlos no escala.

### 3. Nomenclatura incorrecta
❌ **MAL:**
```
features/staff/
  models/           # Contiene hooks, no modelos
    use-staff.ts
```

✅ **BIEN:**
```
features/staff/
  hooks/            # Nombre semánticamente correcto
    use-staff.ts
  domain/           # Este sí contiene modelos/tipos
    staff.ts
```

## Escalabilidad

### Agregar un nuevo feature
1. Crear estructura de carpetas:
```bash
features/new-feature/
  domain/
    entity.ts
  infra/
    repository.ts
  hooks/
    use-entity.ts
  ui/
    form.tsx
    table.tsx
```

2. Implementar repository usando api-utils:
```typescript
import { buildApiUrl, buildTenantUrl } from "~/shared/lib/api-utils";
import { genericFetch } from "~/shared/lib/generic-fetch";

export const entityRepository = {
  list: () => genericFetch(buildTenantUrl("entities")),
  // ... resto de métodos CRUD
};
```

3. Crear hooks con TanStack Query:
```typescript
export const useEntities = () => {
  return useQuery({
    queryKey: ["entities"],
    queryFn: entityRepository.list,
  });
};
```

### Testing
Cada capa es testeable independientemente:
- `domain/`: Unit tests para lógica de negocio
- `infra/`: Mock de fetch para tests de repositories
- `hooks/`: Mock de repositories para tests de hooks
- `ui/`: Testing Library para componentes

## Referencias
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [TanStack Query](https://tanstack.com/query/latest)
