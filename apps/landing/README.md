# NOVAHAIR - Sistema de Gestión de Peluquería
https://drive.google.com/drive/folders/1PZ3SUYSr-sBDonBQV10ghXTqZJdRO9M5?usp=share_link
Sistema moderno de gestión de citas y servicios para peluquerías, construido con TanStack Router, React Query y Tailwind CSS.

## 🚀 Características

- ✅ **Sistema de reservas online** - Los clientes pueden agendar citas fácilmente
- ✅ **Panel de administración** - Gestión completa de citas, servicios y personal
- ✅ **Diseño responsive** - Optimizado para móvil, tablet y escritorio
- ✅ **Modo oscuro/claro** - Tema adaptable según preferencia del usuario
- ✅ **Multiidioma** - Soporte para internacionalización con i18next
- ✅ **Animaciones fluidas** - GSAP y Framer Motion para una UX superior
- ✅ **Tipado estricto** - TypeScript para mayor seguridad y productividad

## 📋 Requisitos Previos

- Node.js >= 18
- pnpm >= 8

## 🛠️ Instalación

```bash
# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar en modo desarrollo
pnpm dev
```

## 🎯 Scripts Disponibles

```bash
pnpm dev          # Inicia el servidor de desarrollo en puerto 3000
pnpm build        # Compila el proyecto para producción
pnpm serve        # Previsualiza la build de producción
pnpm test         # Ejecuta los tests con Vitest
pnpm coverage     # Genera reporte de cobertura de tests
pnpm lint         # Ejecuta el linter (Biome + i18next)
pnpm format       # Formatea el código con Biome
pnpm check        # Ejecuta linter y formatter
```

## 📁 Arquitectura del Proyecto

```
src/
├── features/          # Módulos por funcionalidad
│   ├── appointments/  # Gestión de citas
│   ├── services/      # Servicios de peluquería
│   ├── staff/         # Personal
│   └── ...
├── routes/            # Rutas de TanStack Router
├── shared/            # Código compartido
│   ├── ui/            # Componentes UI reutilizables
│   ├── hooks/         # Custom hooks
│   ├── i18n/          # Configuración de idiomas
│   └── types/         # Tipos compartidos
└── lib/               # Utilidades y helpers
```

### Patrón de Arquitectura por Feature

Cada feature sigue esta estructura:

```
feature/
├── domain/      # Entidades y reglas de negocio
├── infra/       # Capa de infraestructura (API, localStorage)
├── model/       # Hooks y lógica de estado
└── ui/          # Componentes de presentación
```

## 🎨 Stack Tecnológico

### Core
- **React 19** - Biblioteca UI
- **TypeScript 5.7** - Tipado estático
- **Vite 7** - Build tool y dev server

### Routing & Estado
- **TanStack Router** - Sistema de routing avanzado
- **TanStack Query** - Manejo de estado del servidor
- **React Router DevTools** - Debugging de rutas

### UI & Styling
- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Componentes accesibles sin estilos
- **Framer Motion** - Animaciones y transiciones
- **GSAP** - Animaciones complejas
- **Lucide React** - Iconos

### Testing
- **Vitest** - Test runner y framework
- **Testing Library** - Utilities para testing de componentes
- **jsdom** - Entorno DOM para tests

### Calidad de Código
- **Biome** - Linter y formatter moderno
- **i18next** - Internacionalización

## 🧪 Testing

```bash
# Ejecutar todos los tests
pnpm test

# Tests en modo watch
pnpm test --watch

# Generar reporte de cobertura
pnpm coverage
```

## 🌐 Internacionalización

El proyecto usa `i18next` para multiidioma. Los archivos de traducción están en:

```
src/shared/i18n/locales/
├── es/
│   └── translation.json
└── en/
    └── translation.json
```

Para agregar una nueva traducción:

```typescript
import { t } from "i18next";

// En tu componente
<h1>{t("welcome_message")}</h1>
```

## 🎨 Componentes UI

Este proyecto usa [Shadcn UI](https://ui.shadcn.com/). Para agregar componentes:

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add dialog
# etc...
```

## 🚀 Deploy en Producción

### Vercel (Recomendado)

```bash
# Ya configurado en vercel.json
vercel --prod
```

### Build Manual

```bash
pnpm build
# Los archivos compilados estarán en dist/
```

## 🔒 Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
VITE_APP_NAME=NOVAHAIR
VITE_APP_URL=https://tu-dominio.com
VITE_DEFAULT_LOCALE=es
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bugs
- `Update:` Actualización de código existente
- `Remove:` Eliminación de código
- `Docs:` Cambios en documentación
- `Style:` Cambios de formato (no afectan lógica)
- `Refactor:` Refactorización de código
- `Test:` Agregar o modificar tests

## 📝 Licencia

Este proyecto es privado y confidencial.

## 👨‍💻 Autor

Destacat.cat - Pol Gubau Amores

---

¿Preguntas o problemas? Abre un issue en el repositorio.



## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).


## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
