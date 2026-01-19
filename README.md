# Novahair Monorepo

Monorepo con pnpm workspaces para las aplicaciones de Novahair: Admin, Booking y Landing pages.

## 🏗️ Estructura del Proyecto

```
novahair/
├── apps/                      # Aplicaciones
│   ├── admin/                # Panel de administración
│   ├── booking/              # Sistema de reservas
│   └── landing-templates/    # Plantillas landing page
├── packages/                  # Paquetes compartidos
│   ├── ui/                   # Componentes UI compartidos
│   └── utils/                # Utilidades y hooks compartidos
├── package.json              # Root package con scripts globales
└── pnpm-workspace.yaml       # Configuración workspace
```

## 📦 Paquetes

### `@novahair/ui`
Componentes UI compartidos (Button, Input, Sidebar, etc.) con soporte para Radix UI y Tailwind CSS.

### `@novahair/utils`
Hooks, utilidades y funciones helper compartidas (i18n, API utils, hooks personalizados).

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar todas las dependencias
pnpm install
```

### Desarrollo

```bash
# Iniciar todas las apps en modo dev
pnpm dev

# Iniciar una app específica
pnpm dev:admin
pnpm dev:booking
pnpm dev:landing
```

### Build

```bash
# Build todas las apps
pnpm build

# Build una app específica
pnpm build:admin
pnpm build:booking
pnpm build:landing
```

### Otros Scripts

```bash
# Lint y formato
pnpm lint
pnpm format
pnpm check

# Tests
pnpm test

# Limpiar node_modules
pnpm clean
pnpm clean:all
```

## 🔧 Comandos Útiles de pnpm

```bash
# Agregar dependencia a una app específica
pnpm --filter @novahair/admin add <package>

# Agregar dependencia a todas las apps
pnpm --filter "./apps/*" add <package>

# Agregar paquete compartido como dependencia
pnpm --filter @novahair/admin add @novahair/ui@workspace:*

# Ejecutar script en todas las apps
pnpm --filter "./apps/*" <script>
```

## 📝 Uso de Paquetes Compartidos

### En tu aplicación

```json
{
  "name": "@novahair/admin",
  "dependencies": {
    "@novahair/ui": "workspace:*",
    "@novahair/utils": "workspace:*"
  }
}
```

### En tu código

```tsx
// Importar componentes UI
import { Button } from "@novahair/ui/button";
import { AdminMain } from "@novahair/ui/layouts/admin/admin-main";

// Importar utilidades
import { cn } from "@novahair/utils/lib/cn";
import { useMobile } from "@novahair/utils/hooks/use-mobile";
```

## 🎯 Ventajas del Monorepo

1. **Código compartido centralizado**: Un solo lugar para componentes UI y utilidades
2. **Type-safety completo**: TypeScript funciona entre paquetes
3. **Versionado unificado**: Todos los paquetes comparten dependencias
4. **Desarrollo eficiente**: Cambios en paquetes compartidos se reflejan inmediatamente
5. **Builds optimizados**: pnpm gestiona el caché globalmente

## 🛠️ Stack Tecnológico

- **Build tool**: Vite
- **Package manager**: pnpm
- **Framework**: React 19
- **Router**: TanStack Router
- **State**: TanStack Query
- **UI**: Radix UI + Tailwind CSS
- **i18n**: i18next
- **Testing**: Vitest

## 📚 Más Información

- [Documentación de pnpm workspaces](https://pnpm.io/workspaces)
- [Guía de @novahair/ui](./packages/ui/README.md)
- [Guía de @novahair/utils](./packages/utils/README.md)
