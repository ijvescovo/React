# TechStore - E-commerce React

Aplicación de e-commerce desarrollada con React, Vite, Context API y Bootstrap. Cubre todos los temas del temario de 16 clases de React.

## 🎯 Características Principales

### 1. **Autenticación de Usuarios** (Clases 8-9)
- Login con email y contraseña
- Registro de nuevos usuarios
- Validación de contraseñas (mínimo 6 caracteres)
- Persistencia de sesión con localStorage
- Roles de usuario (customer, admin)

### 2. **Gestión de Productos** (Clases 10-12)
- CRUD completo de productos (Create, Read, Update, Delete)
- Panel de administración para gestionar productos
- Búsqueda en tiempo real
- Filtrado por categoría
- Rango de precios ajustable
- Edición inline de productos en admin

### 3. **Carrito de Compras**
- Agregar/remover productos
- Ajustar cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Vista del carrito con detalles

### 4. **Rutas Protegidas** (Clases 6-7)
- Rutas públicas (inicio, productos, login, registro)
- Rutas protegidas (carrito)
- Rutas solo para administradores (/admin)
- Redirección automática a login cuando es necesario

### 5. **Diseño Responsive** (Clases 13-14)
- Bootstrap 5 para diseño moderno
- Mobile-first approach
- Estilos personalizados en App.css
- Navbar colapsable en móviles
- Grid sistema responsivo

## 📁 Estructura del Proyecto

```
ecommerce-react/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx      # Navbar con navegación
│   │   ├── Footer.jsx      # Footer
│   │   ├── ProductCard.jsx # Card de producto
│   │   └── ProtectedRoute.jsx # Wrapper para rutas protegidas
│   ├── context/            # Context API para estado global
│   │   ├── AuthContext.jsx      # Autenticación
│   │   ├── CartContext.jsx      # Carrito de compras
│   │   └── ProductContext.jsx   # Productos y CRUD
│   ├── hooks/              # Custom hooks
│   │   └── useContexts.js  # Hooks para acceder a contexts
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.jsx        # Página inicio
│   │   ├── Productos.jsx   # Listado de productos
│   │   ├── ProductoDetalle.jsx  # Detalle de producto
│   │   ├── Carrito.jsx     # Carrito de compras
│   │   ├── Login.jsx       # Formulario de login
│   │   ├── Registro.jsx    # Formulario de registro
│   │   └── Admin.jsx       # Panel de administración
│   ├── App.jsx             # Componente principal con Router
│   ├── App.css             # Estilos de la aplicación
│   ├── index.css           # Estilos globales
│   └── main.jsx            # Punto de entrada
├── index.html              # HTML principal
├── package.json            # Dependencias del proyecto
├── vite.config.js          # Configuración de Vite
└── eslint.config.js        # Configuración de ESLint
```

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js v16+ 
- npm o yarn

### Pasos

1. **Instalar dependencias**
```bash
npm install
```

2. **Ejecutar servidor de desarrollo**
```bash
npm run dev
```

3. **Compilar para producción**
```bash
npm run build
```

4. **Vista previa de producción**
```bash
npm run preview
```

## 📦 Dependencias Principales

- **react**: 19.2.0 - Librería UI
- **react-dom**: 19.2.0 - Renderizado en DOM
- **react-router-dom**: 6.20.0 - Enrutamiento
- **bootstrap**: 5.3.2 - Framework CSS

## 🔐 Credenciales de Prueba

### Usuario Regular
- Email: `usuario@test.com`
- Contraseña: `123456`

### Administrador
- Email: `admin@test.com`
- Contraseña: `123456`

## 📝 Funcionalidades por Página

### Home (/)
- Hero section
- Sección de características
- Botones de llamada a la acción

### Productos (/productos)
- Listado de todos los productos
- Búsqueda en tiempo real
- Filtrado por categoría
- Filtro de rango de precios
- Grid responsivo (3 columnas en desktop, 1 en mobile)
- Botón para agregar al carrito

### Detalle de Producto (/producto/:id)
- Información detallada del producto
- Selector de cantidad
- Botón de agregar al carrito
- Verificación de stock disponible

### Carrito (/carrito)
- Tabla de productos en carrito
- Ajuste de cantidades
- Botón para eliminar items
- Cálculo de subtotal y total
- Botón de compra (simula checkout)

### Login (/login)
- Formulario de email y contraseña
- Validación de campos
- Mensajes de error
- Link a registro

### Registro (/registro)
- Formulario de nombre, email y contraseña
- Validación de contraseña (mínimo 6 caracteres)
- Confirmación de contraseña
- Mensajes de éxito y error

### Admin (/admin) - Solo para administradores
- **Crear Producto**: Formulario para agregar nuevos productos
- **Listar Productos**: Tabla con todos los productos
- **Editar**: Edición inline de productos
- **Eliminar**: Botón para eliminar productos con confirmación

## 💾 Persistencia de Datos

Todos los datos se almacenan en `localStorage`:
- `auth_user`: Datos del usuario autenticado
- `auth_token`: Token de sesión
- `products`: Lista de todos los productos
- `cart`: Items del carrito de compras

## 🎓 Cobertura del Temario

| Clase | Tema | Implementación |
|-------|------|-----------------|
| 1-2 | Fundamentos React & JSX | ✅ Componentes en JSX |
| 3 | Componentes Reutilizables | ✅ ProductCard, Header, Footer |
| 4 | useState Hook | ✅ Formularios, filtros, edición |
| 5 | useEffect Hook | ✅ localStorage sync, validaciones |
| 6-7 | React Router | ✅ 6 rutas, rutas dinámicas |
| 8-9 | Autenticación & Context | ✅ AuthContext con login/logout |
| 10-12 | CRUD & Context | ✅ ProductContext con full CRUD |
| 13-14 | Styling & Responsive | ✅ Bootstrap + App.css |
| 15-16 | Proyecto Integrador | ✅ E-commerce completo |

## 🔧 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **Vite** - Build tool
- **React Router v6** - Enrutamiento
- **Context API** - Manejo de estado global
- **Bootstrap 5** - Diseño responsive
- **localStorage** - Persistencia de datos
- **ESLint** - Linting

## 📱 Responsive Design

- Desktop: 3 columnas en grid de productos
- Tablet: 2 columnas
- Mobile: 1 columna
- Navbar colapsable

## 🚀 Deployment

La aplicación está lista para desplegar en:
- Vercel
- Netlify
- GitHub Pages
- Heroku

## 📄 Licencia

Proyecto educativo

## 👨‍💼 Autor

Desarrollado como proyecto integrador del temario de React

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0.0
