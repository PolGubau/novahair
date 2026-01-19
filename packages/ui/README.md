# @novahair/ui

Paquete compartido de componentes UI para todas las aplicaciones Novahair.

## Componentes incluidos

- **UI primitivos**: Button, Input, Select, Checkbox, Switch, etc.
- **Componentes de layout**: Sidebar, Header, Footer
- **Layouts admin**: AppSidebar, AdminMain
- **Componentes de utilidad**: ErrorBoundary, LoadingOverlay, Spinner
- **Componentes avanzados**: DataTable, MiniCalendar, Drawer, Sheet

## Uso

```tsx
import { Button } from "@novahair/ui/button";
import { Input } from "@novahair/ui/input";
import { AdminMain } from "@novahair/ui/layouts/admin/admin-main";

function MyComponent() {
  return (
    <AdminMain title="mi_titulo" description="descripcion">
      <Button>Click me</Button>
      <Input placeholder="Type something..." />
    </AdminMain>
  );
}
```

## Estructura

```
src/
├── button.tsx
├── input.tsx
├── ...
├── layouts/
│   └── admin/
│       ├── admin-main.tsx
│       ├── app-sidebar.tsx
│       └── ...
└── theme/
    ├── colors.css
    └── animations.css
```

## Peer Dependencies

Este paquete requiere que la aplicación que lo use tenga instaladas:
- React 19+
- Radix UI components
- Framer Motion
- i18next
- TanStack Router
