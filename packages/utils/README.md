# @novahair/utils

Paquete compartido de utilidades, hooks y funciones helper para todas las aplicaciones Novahair.

## Contenido

### Hooks
- `use-controlled-state`: Hook para manejar estado controlado/no controlado
- `use-mobile`: Detecta si el dispositivo es móvil
- `use-repository-mutation`: Hook genérico para mutaciones con repositorios

### Lib
- `cn`: Utilidad para combinar clases de Tailwind con clsx
- `api-utils`: Helpers para construir URLs de API
- `api-error`: Manejo de errores de API
- `calendar`: Utilidades para trabajar con calendarios
- `generic-fetch`: Wrapper genérico de fetch
- `get-strict-context`: Context de React con validación
- `get-weekday-names`: Nombres de días de la semana i18n
- `query-keys`: Keys para React Query
- `try-catch`: Wrapper try-catch funcional

### Types
- `common`: Tipos compartidos entre aplicaciones

### i18n
- `setup`: Configuración de i18next
- `locales/`: Traducciones (ca, es, en)

## Uso

```tsx
import { cn } from "@novahair/utils/lib/cn";
import { useMobile } from "@novahair/utils/hooks/use-mobile";
import type { AbstractRepository } from "@novahair/utils/types/common";

function MyComponent() {
  const isMobile = useMobile();
  
  return (
    <div className={cn("base-class", isMobile && "mobile-class")}>
      Content
    </div>
  );
}
```

## Peer Dependencies

- React 19+
- i18next
- react-i18next
- clsx
- date-fns
