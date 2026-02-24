# PHYSIOCARE - Landing para Clínicas de Fisioterapia

Landing page moderna para clínicas de fisioterapia, construida con TanStack Router, React Query y Tailwind CSS.

## 🚀 Características

- ✅ **Sistema de reservas online** - Los pacientes pueden agendar citas fácilmente
- ✅ **Multi-tenant** - Soporta múltiples clínicas con tenant ID
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

# Configurar tu TENANT_ID en .env.local
VITE_TENANT_ID=tu_tenant_id
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# La aplicación estará disponible en http://localhost:3003
```

## 🏗️ Build

```bash
# Generar build de producción
pnpm build

# Preview del build
pnpm serve
```

## 📁 Estructura del Proyecto

```
src/
├── data/              # Datos estáticos (copy, testimonials)
├── features/          # Features de la aplicación
│   ├── landing/       # Componentes de la landing page
│   ├── preloader/     # Preloader animado
│   └── services/      # Listado de servicios
├── integrations/      # Integraciones (TanStack Query)
├── routes/            # Rutas de TanStack Router
├── shared/            # Componentes y utilidades compartidas
│   ├── i18n/          # Configuración de internacionalización
│   └── ui/            # Componentes UI reutilizables
└── styles.css         # Estilos globales
```

## 🎨 Stack Tecnológico

### Core
- **React 19** - Biblioteca UI
- **TypeScript 5.7** - Tipado estático
- **Vite 7** - Build tool y dev server

### Routing & Estado
- **TanStack Router** - Sistema de routing avanzado
- **TanStack Query** - Manejo de estado del servidor

### UI & Animaciones
- **Tailwind CSS 4** - Framework CSS utility-first
- **GSAP** - Animaciones de alto rendimiento
- **Framer Motion** - Animaciones declarativas
- **Lenis** - Smooth scroll

### Internacionalización
- **i18next** - Framework de i18n
- **react-i18next** - Integración con React

## 🌐 Internacionalización

La aplicación soporta múltiples idiomas. Los archivos de traducción se encuentran en:

```
src/shared/i18n/locales/
├── en.json
└── es.json
```

## 📝 Licencia

Privado - © PHYSIOCARE

