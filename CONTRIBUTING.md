# Guía de Contribución

¡Gracias por tu interés en contribuir a NOVAHAIR! Esta guía te ayudará a entender cómo puedes colaborar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits y Pull Requests](#commits-y-pull-requests)

## 🤝 Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Muestra empatía hacia otros colaboradores

## 🚀 Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado anteriormente
2. Abre un issue con el template de bug
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si es aplicable
   - Versión del navegador/OS

### Sugerir Mejoras

1. Abre un issue con el template de feature request
2. Explica claramente:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Impacto esperado

### Contribuir con Código

1. Haz fork del proyecto
2. Crea una rama desde `master`:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```
3. Realiza tus cambios siguiendo los estándares
4. Asegúrate que los tests pasen
5. Haz commit de tus cambios
6. Push a tu fork
7. Abre un Pull Request

## ⚙️ Configuración del Entorno

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/novahair.git
cd novahair

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
pnpm dev
```

## 💻 Proceso de Desarrollo

### Estructura de Branches

- `main` - Código en producción
- `develop` - Branch principal de desarrollo
- `feature/*` - Nuevas funcionalidades
- `fix/*` - Correcciones de bugs
- `refactor/*` - Refactorizaciones
- `docs/*` - Documentación

### Workflow

1. Actualiza tu branch con la última versión:
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Crea una nueva branch:
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

3. Desarrolla tu funcionalidad

4. Ejecuta los checks:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

5. Commit y push:
   ```bash
   git add .
   git commit -m "Add: descripción del cambio"
   git push origin feature/nombre-descriptivo
   ```

## 📝 Estándares de Código

### TypeScript

- Usa tipos explícitos, evita `any`
- Prefiere interfaces para objetos públicos
- Usa tipos para casos específicos
- Documenta funciones complejas con JSDoc

### React

- Componentes funcionales con hooks
- Props con destructuring
- Custom hooks para lógica reutilizable
- Mantén componentes pequeños y enfocados

### Naming Conventions

- **Archivos**: kebab-case (`my-component.tsx`)
- **Componentes**: PascalCase (`MyComponent`)
- **Funciones**: camelCase (`handleClick`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **Tipos/Interfaces**: PascalCase (`UserProfile`)

### Organización de Imports

```typescript
// 1. External dependencies
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. Internal absolute imports
import { Button } from "~/shared/ui/button";
import type { User } from "~/shared/types/user";

// 3. Relative imports
import { helper } from "./utils";
import type { LocalType } from "./types";
```

### Estilos con Tailwind

- Usa clases utilitarias de Tailwind
- Para estilos complejos, usa `cn()` helper
- Mantén responsive design (mobile-first)
- Usa variables CSS para temas

## 📦 Commits y Pull Requests

### Formato de Commits

Usa conventional commits:

```
<tipo>: <descripción>

[cuerpo opcional]

[footer opcional]
```

**Tipos:**
- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bug
- `Update:` Actualización de funcionalidad existente
- `Remove:` Eliminación de código
- `Refactor:` Cambios que no afectan funcionalidad
- `Docs:` Cambios en documentación
- `Style:` Cambios de formato
- `Test:` Agregar o modificar tests
- `Chore:` Tareas de mantenimiento

**Ejemplos:**
```bash
Add: sistema de notificaciones push
Fix: error en validación de formulario de citas
Update: mejorar rendimiento de calendario
Docs: actualizar README con nuevas instrucciones
```

### Pull Requests

**Título:**
- Claro y descriptivo
- Usa el formato de commits
- Ejemplo: `Add: integración con pasarela de pago`

**Descripción debe incluir:**
- ✅ Qué cambia este PR
- ✅ Por qué es necesario
- ✅ Cómo se implementó
- ✅ Screenshots/videos si aplica
- ✅ Checklist de testing
- ✅ Breaking changes (si hay)

**Checklist antes de abrir PR:**
- [ ] El código compila sin errores
- [ ] Todos los tests pasan
- [ ] Lint pasa sin warnings
- [ ] Agregué tests para nueva funcionalidad
- [ ] Actualicé la documentación
- [ ] Revisé mi propio código
- [ ] No hay console.logs olvidados
- [ ] Variables de entorno documentadas

## 🧪 Testing

- Escribe tests para nueva funcionalidad
- Mantén cobertura > 80%
- Tests unitarios para lógica de negocio
- Tests de integración para flujos críticos

```bash
# Ejecutar tests
pnpm test

# Tests con coverage
pnpm coverage

# Tests en watch mode
pnpm test --watch
```

## 📚 Recursos Adicionales

- [Documentación de TanStack Router](https://tanstack.com/router)
- [Documentación de React Query](https://tanstack.com/query)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Biome Linter](https://biomejs.dev)

## ❓ Preguntas

Si tienes preguntas, puedes:
- Abrir un issue con la etiqueta `question`
- Contactar al equipo en destacat.cat

---

¡Gracias por contribuir! 🎉
