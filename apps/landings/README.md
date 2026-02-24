# Landings - Sistema de Reservas Multi-Tenant

Este directorio contiene diferentes landings **con diseños únicos** para mostrar el sistema de reservas a diferentes tipos de negocios. Cada landing tiene su propia estructura, componentes y experiencia de usuario adaptada al sector.

## 🎯 Landings Disponibles

### 1. 💇 **Clean** (Peluquería - NOVAHAIR)
- **Puerto**: 3002
- **Diseño**: Elegante, minimalista, visual
- **Estructura**: Hero con imágenes GSAP → Servicios → Testimonios marquee → Parallax gallery
- **Colores**: Neutros, elegantes
- **Características**: Enfoque en estética y visuales

### 2. 🏥 **Physio** (Fisioterapia - PHYSIOCARE)
- **Puerto**: 3003
- **Diseño**: Profesional, médico, confianza
- **Estructura**: Hero médico → Por qué elegirnos → Tratamientos grid → Equipo → Casos de éxito
- **Colores**: Azules profesionales
- **Características**: Enfoque en credibilidad y resultados

### 3. 💪 **Fitness** (Gimnasio - FITZONE)
- **Puerto**: 3004
- **Diseño**: Energético, motivacional, dinámico
- **Estructura**: Hero fitness → Beneficios → Horario clases → Entrenadores → Transformaciones → CTA final
- **Colores**: Gradientes naranja/rojo/morado
- **Características**: Enfoque en motivación y transformación

## 🚀 Cómo usar

Cada landing es independiente y puede ejecutarse por separado:

```bash
# Desde la raíz del monorepo
cd apps/landings/[nombre-landing]

# Instalar dependencias (si es necesario)
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu TENANT_ID

# Ejecutar en desarrollo
pnpm dev
```

## 📦 Estructura de cada Landing

Todas las landings comparten la misma estructura base:

```
landing/
├── public/              # Assets públicos (imágenes, favicon)
├── src/
│   ├── data/           # Datos estáticos (copy, testimonials)
│   ├── features/       # Features de la aplicación
│   │   ├── landing/    # Componentes de la landing
│   │   ├── preloader/  # Preloader animado
│   │   └── services/   # Listado de servicios
│   ├── integrations/   # Integraciones (TanStack Query)
│   ├── routes/         # Rutas de TanStack Router
│   │   ├── __root.tsx  # Layout raíz
│   │   ├── index.tsx   # Página principal
│   │   └── booking/    # Página de reservas
│   ├── shared/         # Componentes compartidos
│   │   ├── i18n/       # Traducciones
│   │   └── ui/         # Componentes UI
│   └── styles.css      # Estilos globales
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Diseños Únicos por Tipo de Negocio

Cada landing tiene una estructura y componentes completamente diferentes, adaptados al tipo de cliente:

### 🏥 PhysioCare (Fisioterapia)
**Enfoque**: Profesional, médico, confianza
**Componentes**:
- Hero médico con estadísticas de éxito
- Sección "Por qué elegirnos" con beneficios
- Grid de tratamientos con precios
- Equipo profesional con especialidades
- Casos de éxito en formato grid

### 💪 FitZone (Gimnasio)
**Enfoque**: Energético, motivacional, transformación
**Componentes**:
- Hero con gradientes vibrantes y animaciones
- Beneficios con iconos dinámicos
- Horario de clases con indicadores de intensidad
- Entrenadores en formato tarjetas
- Transformaciones en carrusel horizontal
- CTA final con fondo gradiente

### 💇 Clean (Peluquería)
**Enfoque**: Elegante, visual, estético
**Componentes**:
- Hero con imágenes animadas GSAP
- Servicios en cards visuales
- Testimonios en marquee infinito
- Galería parallax
- Diseño minimalista y limpio

## 🔧 Personalización

Para crear una nueva landing:

1. **Copiar una landing existente**
   ```bash
   cp -r apps/landings/physio apps/landings/nueva-landing
   ```

2. **Actualizar package.json**
   - Cambiar `name`
   - Cambiar `port` en script `dev`

3. **Personalizar datos**
   - `src/data/copy.ts` - Textos y datos de contacto
   - `src/data/testimonials.ts` - Testimonios
   - `src/shared/i18n/locales/*.json` - Traducciones

4. **Actualizar componentes**
   - `src/features/landing/ui/title.tsx` - Nombre del negocio
   - `src/routes/__root.tsx` - Meta tags y SEO
   - `src/routes/booking/index.tsx` - Título de la página de booking

5. **Añadir imágenes**
   - Colocar imágenes en `public/images/`
   - Actualizar referencias en componentes

## 🌐 Variables de Entorno

Cada landing necesita:

```env
VITE_TENANT_ID=tu_tenant_id_aqui
VITE_API_URL=https://api.gerardmartinez.es/api
```

## 📝 Notas

- Todas las landings usan el mismo sistema de UI (`@novahair/ui`)
- Todas comparten el cliente de API (`@novahair/client`)
- El componente de booking es reutilizable (`@novahair/booking-app`)
- Las animaciones son consistentes entre landings
- El sistema es multi-tenant por diseño

## 🎯 Próximos Pasos

Ideas para nuevas landings:
- Spa y centros de belleza
- Clínicas dentales
- Centros de estética
- Talleres mecánicos
- Restaurantes
- Consultas médicas
- Centros de yoga/pilates

