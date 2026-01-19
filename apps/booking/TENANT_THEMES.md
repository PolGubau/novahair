# Uso de Tenant Themes en Booking

## En el componente raíz de booking

```tsx
// apps/booking/src/app.tsx o router.tsx
import { useEffect } from 'react';
import { applyTenantTheme, tenantThemes } from '@novahair/utils/lib/tenant-theme';

function App() {
  useEffect(() => {
    // Obtener el tema del tenant desde tu API o config
    const tenantId = getTenantId(); // tu lógica
    
    // Aplicar tema predefinido
    applyTenantTheme(tenantThemes.purple);
    
    // O cargar desde API:
    // fetch(`/api/tenants/${tenantId}/theme`)
    //   .then(res => res.json())
    //   .then(theme => applyTenantTheme(theme));
  }, []);

  return <YourApp />;
}
```

## Ejemplo con colores custom desde API

```tsx
// La API devuelve:
{
  "primary": "271 81% 56%",        // Purple
  "primaryForeground": "0 0% 100%",
  "accent": "142 76% 36%"          // Green accent
}

// Se aplica automáticamente a todas las variables CSS
applyTenantTheme(apiResponse);
```
