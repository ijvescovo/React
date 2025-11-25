# 🚀 Guía Rápida - TechStore E-Commerce

## 📌 ¿Qué se entregó?

Una aplicación de e-commerce **100% funcional** construida con React que cubre todos los temas del temario de 16 clases.

---

## 🎯 Flujos de Prueba

### 1️⃣ **Flujo de Usuario Regular**
```
Home (/) → Comprar Ahora → Ver Productos (/productos)
→ Hacer click en un producto → Detalle (/producto/:id)
→ Seleccionar cantidad → Agregar al Carrito
→ Ver Carrito (/carrito) → Ajustar cantidades
```

### 2️⃣ **Flujo de Autenticación**
```
Home → Registro (/registro)
→ Llenar: Nombre, Email, Contraseña (min 6 caracteres)
→ Confirmar contraseña → Registrarse
→ Login automático y redirige a Home
→ Header muestra "👤 TU_NOMBRE" y botón Logout
```

### 3️⃣ **Flujo de Administrador**
```
Login (/login) con:
  Email: admin@test.com
  Contraseña: 123456
→ Header muestra link "Admin"
→ Click en Admin → Panel CRUD (/admin)
→ Crear nuevo producto
→ Editar producto (click en fila)
→ Eliminar producto (botón rojo)
```

### 4️⃣ **Búsqueda y Filtros** (En /productos)
```
Buscar productos → En tiempo real por nombre
Filtrar por categoría (dropdown)
Ajustar rango de precios (slider)
Ver resultados filtrados en tiempo real
```

---

## 💾 Datos de Prueba

### Usuarios Precargados:
```
Usuario Regular:
  Email: usuario@test.com
  Contraseña: 123456

Administrador:
  Email: admin@test.com
  Contraseña: 123456
```

### Productos Iniciales:
```
1. iPhone 15 Pro - $999
2. MacBook Pro - $1999
3. iPad Air - $599
4. AirPods Pro - $249
5. Apple Watch - $399
```

---

## 📂 Arquitectura del Proyecto

```
Contexts (Estado Global)
├── AuthContext.jsx        → Maneja login/logout/registro
├── CartContext.jsx        → Maneja carrito de compras
└── ProductContext.jsx     → Maneja CRUD de productos

Componentes Reutilizables
├── Header.jsx            → Navbar con navegación
├── Footer.jsx            → Footer
├── ProductCard.jsx       → Card individual de producto
└── ProtectedRoute.jsx    → Protege rutas admin

Páginas
├── Home.jsx              → Página inicio
├── Productos.jsx         → Listado con filtros
├── ProductoDetalle.jsx   → Detalle de 1 producto
├── Carrito.jsx           → Carrito de compras
├── Login.jsx             → Formulario login
├── Registro.jsx          → Formulario registro
└── Admin.jsx             → CRUD de productos
```

---

## 🔄 Flujo de Datos

```
User Action
    ↓
Componente (useState, onClick)
    ↓
Context (AuthContext, CartContext, ProductContext)
    ↓
localStorage (Persistencia)
    ↓
UI actualizada automáticamente
```

### Ejemplo: Agregar al carrito
```
1. Click en botón "Agregar al Carrito" (ProductCard.jsx)
2. Se ejecuta addToCart() del CartContext
3. Se agrega item a estado del contexto
4. Se guarda en localStorage
5. Badge del carrito se actualiza automáticamente
```

---

## 🔐 Rutas Disponibles

| Ruta | Tipo | Acceso | Descripción |
|------|------|--------|-------------|
| `/` | Pública | Todos | Página de inicio |
| `/productos` | Pública | Todos | Listado de productos |
| `/producto/:id` | Pública | Todos | Detalle de producto |
| `/carrito` | Privada | Autenticados | Carrito de compras |
| `/login` | Pública | No autenticados | Formulario login |
| `/registro` | Pública | No autenticados | Formulario registro |
| `/admin` | Privada | Solo admins | Panel de administración |

---

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Verificar linting
npm lint
```

---

## 💾 Persistencia de Datos

Todo se guarda automáticamente en `localStorage`:
- **auth_user**: Datos del usuario logueado
- **auth_token**: Token de sesión
- **products**: Todos los productos
- **cart**: Items del carrito

Al recargar la página, todo se restaura automáticamente.

---

## ✨ Características Implementadas

✅ **Clase 1-2: React Básico & JSX**
- Componentes funcionales
- Props
- JSX syntax

✅ **Clase 3: Componentes Reutilizables**
- ProductCard se reutiliza en Productos y Admin
- Header y Footer generalizados

✅ **Clase 4: useState**
- Formularios de login/registro
- Filtros en Productos
- Edición inline en Admin
- Selector de cantidad

✅ **Clase 5: useEffect**
- Sincronización con localStorage
- Validaciones automáticas

✅ **Clase 6-7: React Router**
- 6 rutas configuradas
- Rutas dinámicas (/producto/:id)
- Navegación entre páginas

✅ **Clase 8-9: Autenticación & Context API**
- AuthContext con login/logout/registro
- Rol-based access control
- Protected routes

✅ **Clase 10-12: CRUD & Context**
- Create: Crear nuevo producto
- Read: Listar todos los productos
- Update: Editar producto
- Delete: Eliminar producto

✅ **Clase 13-14: Styling & Responsive**
- Bootstrap 5
- Diseño mobile-first
- Custom CSS (App.css)
- Navbar responsive

✅ **Clase 15-16: Proyecto Integrador**
- E-commerce completo
- Integración de todos los temas
- Productivo y listo para deployment

---

## 🐛 Troubleshooting

### El servidor no inicia
```bash
cd ecommerce-react
npm install
npm run dev
```

### Productos no se ven
- Asegúrate de estar en `/productos`
- Verifica que no haya filtros activos
- Limpia el localStorage: `localStorage.clear()`

### No puedo acceder a admin
- Debes estar logueado como admin
- Email: admin@test.com, Contraseña: 123456
- Luego aparecerá link "Admin" en el navbar

### Carrito no persiste
- localStorage debe estar habilitado en el navegador
- Verifica que no esté en "Private Mode" o "Incognito"

---

## 🎓 Temario Cubierto

| Clase | Tema | ✅ Implementado |
|-------|------|-----------------|
| 1 | Introducción a React | Estructura, componentes |
| 2 | JSX & Componentes | Todo en JSX, componentes funcionales |
| 3 | Componentes Reutilizables | ProductCard, Header, Footer |
| 4 | useState | Todos los formularios y filtros |
| 5 | useEffect | localStorage sync |
| 6 | React Router Basics | Rutas estáticas y dinámicas |
| 7 | Rutas Dinámicas | /producto/:id, /usuario/:id |
| 8 | Context API | AuthContext, CartContext, ProductContext |
| 9 | Autenticación | Login, registro, roles, tokens |
| 10 | CRUD - Create | Crear productos en Admin |
| 11 | CRUD - Read | Listar todos los productos |
| 12 | CRUD - Update/Delete | Editar y eliminar productos |
| 13 | Styling con Bootstrap | Clases de Bootstrap 5 |
| 14 | Responsive Design | Mobile, tablet, desktop |
| 15 | Integración Completa | Toda la app funcionando |
| 16 | Proyecto Final | E-commerce completamente funcional |

---

## 🚀 Próximos Pasos (Opcional)

Para mejorar aún más:

1. **Agregar Backend Real** (Node.js + Express)
   - Replace localStorage con API calls
   - Autenticación JWT
   - Base de datos (MongoDB, PostgreSQL)

2. **Agregar Stripe** (Pagos reales)
   - Integración de Stripe
   - Procesamiento de transacciones

3. **Agregar Testing**
   - Jest + React Testing Library
   - Tests unitarios de componentes

4. **SEO Optimization**
   - Usar Next.js en lugar de Vite
   - Meta tags dinámicas
   - Server-side rendering

5. **Deployment**
   - Vercel, Netlify o AWS Amplify
   - CI/CD con GitHub Actions

---

## 📞 Soporte

Todos los componentes están bien documentados con comentarios. 
Revisa cada archivo para entender exactamente cómo funciona.

**Archivo clave**: `src/App.jsx` - Aquí está toda la configuración de rutas y providers.

---

**Estado**: ✅ Proyecto 100% Funcional y Listo para Entregar
**Última actualización**: Noviembre 25, 2025
