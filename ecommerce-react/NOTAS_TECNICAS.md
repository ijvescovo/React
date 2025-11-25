# 📚 Notas Técnicas - TechStore

## Decisiones Arquitectónicas

### 1. **Por qué Context API en lugar de Redux?**
- ✅ Proyecto educativo, no necesita Redux
- ✅ Context es suficiente para 3 contextos simples
- ✅ Menos dependencias, código más limpio
- ✅ Curva de aprendizaje más baja

### 2. **Por qué localStorage en lugar de Backend?**
- ✅ Proyecto educativo sin backend
- ✅ Demuestra persistencia de datos
- ✅ Funciona offline
- ✅ Suficiente para MVP

### 3. **Por qué Bootstrap en lugar de Tailwind?**
- ✅ Más rápido para MVP
- ✅ Componentes pre-hechos
- ✅ Responsive out of the box
- ✅ Menos CSS custom necesario

---

## Patrones Utilizados

### Pattern 1: Custom Hooks para Context
```javascript
// ✅ CORRECTO: Crear custom hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de AuthProvider");
  return context;
};

// En lugar de acceder directamente
const { user } = useContext(AuthContext);
```

**Ventajas**:
- Error handling automático
- Código más limpio en componentes
- Reutilizable

### Pattern 2: Context + localStorage
```javascript
// En AuthContext
useEffect(() => {
  localStorage.setItem('auth_user', JSON.stringify(user));
}, [user]);

// Al cargar la app
useEffect(() => {
  const saved = localStorage.getItem('auth_user');
  if (saved) setUser(JSON.parse(saved));
}, []);
```

### Pattern 3: Protected Routes
```javascript
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <Admin />
    </ProtectedRoute>
  } 
/>
```

### Pattern 4: Edición Inline
En Admin.jsx, en lugar de formulario separado:
- Click en fila → muestra input
- Edit deshabilitado mientras se edita
- Save o Cancel

---

## Flujo de Datos Detallado

### Agregar Producto al Carrito

```
ProductCard.jsx
  ↓
click "Agregar al Carrito"
  ↓
CartContext.addToCart(product)
  ↓
setState({ cart: [...cart, item] })
  ↓
useEffect detecta cambio en cart
  ↓
localStorage.setItem('cart', JSON.stringify(cart))
  ↓
Header.jsx (usa CartContext)
  ↓
cartCount actualiza automáticamente
  ↓
Badge renderiza nuevo número
```

### Login Usuario

```
Login.jsx
  ↓
click "Login"
  ↓
AuthContext.login(email, password)
  ↓
Validar credenciales (mock en localStorage)
  ↓
setState({ user, token, isAuthenticated: true })
  ↓
useEffect guarda en localStorage
  ↓
useNavigate('/') redirige a home
  ↓
Header.jsx actualiza y muestra nombre del usuario
```

---

## Componentes Explicados

### AuthContext.jsx
```javascript
// Estado:
- user: { id, name, email, role }
- token: string de sesión
- isAuthenticated: boolean

// Métodos:
- login(email, password): Autentica usuario
- register(name, email, password): Crea usuario nuevo
- logout(): Limpia sesión
- isAuthenticated(): Verifica si hay usuario
```

### CartContext.jsx
```javascript
// Estado:
- cart: [ { id, name, price, quantity, ... } ]

// Métodos:
- addToCart(product): Agrega o incrementa cantidad
- removeFromCart(id): Elimina producto
- updateQuantity(id, quantity): Actualiza cantidad
- getTotal(): Calcula total del carrito
- clearCart(): Vacía carrito
```

### ProductContext.jsx
```javascript
// Estado:
- products: [ { id, name, price, stock, ... } ]

// Métodos CRUD:
- getProducts(): Lee todos los productos
- getProduct(id): Lee un producto específico
- createProduct(product): Crea nuevo
- updateProduct(id, data): Actualiza
- deleteProduct(id): Elimina
- getProductsByCategory(category): Filtra
- searchProducts(term): Busca por nombre
```

---

## Performance Tips

### 1. Evitar re-renders innecesarios
```javascript
// ❌ MALO: Crea nueva función cada render
<button onClick={() => handleDelete(id)}>Delete</button>

// ✅ BUENO: Usa useCallback
const handleDelete = useCallback((id) => {
  // ...
}, []);
```

### 2. Memoizar componentes
```javascript
// ✅ ProductCard no re-renderiza si props no cambian
export const ProductCard = React.memo(({ product, onAdd }) => {
  // ...
});
```

### 3. Lazy loading de rutas (Opcional)
```javascript
const Admin = lazy(() => import('./pages/Admin'));

<Suspense fallback={<LoadingSpinner />}>
  <Route path="/admin" element={<Admin />} />
</Suspense>
```

---

## Testing (Opcional para próximas mejoras)

### Setup Jest + React Testing Library
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### Ejemplo de test
```javascript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

test('debe mostrar nombre del producto', () => {
  const product = { id: 1, name: 'iPhone', price: 999 };
  render(<ProductCard product={product} />);
  expect(screen.getByText('iPhone')).toBeInTheDocument();
});
```

---

## Debugging

### 1. React DevTools
- Instala extensión "React Developer Tools"
- Inspecciona props, state, context
- Ve llamadas a hooks

### 2. Console Logging
```javascript
console.log('User:', user);
console.log('Cart:', cart);
console.table(products);  // Muestra en tabla
```

### 3. Verificar localStorage
```javascript
// En consola del navegador:
localStorage.getItem('cart')
localStorage.getItem('auth_user')
localStorage.clear()  // Limpia todo
```

### 4. Network Tab
- F12 → Network
- Verifica que no haya errores 404
- Ve tamaño de los bundles

---

## Escalabilidad Futura

### Si necesitas crecer este proyecto:

1. **Agregar Backend**
   - Reemplazar localStorage con API calls
   - Usar axios o fetch
   - Agregar error handling

2. **Agregar Testing**
   - Jest + React Testing Library
   - Tests unitarios
   - Tests e2e (Cypress, Playwright)

3. **Mejorar Styling**
   - Styled Components o Tailwind
   - Temas dinámicos
   - Dark mode

4. **Optimizar Performance**
   - Code splitting
   - Image optimization
   - Caching strategies

5. **Agregar Features**
   - Wishlist
   - Reviews y ratings
   - Recomendaciones
   - Historial de compras
   - Notificaciones

---

## Común Issues & Solutions

### Issue 1: Carrito no persiste después de recargar
**Solución**: Verificar que localStorage esté habilitado
```javascript
if (typeof(Storage) === "undefined") {
  console.error("localStorage no está disponible");
}
```

### Issue 2: Login no funciona
**Solución**: Verificar credenciales en AuthContext
```javascript
// En AuthContext.jsx
const mockUsers = [
  { id: 1, email: 'usuario@test.com', password: '123456', ... },
  { id: 2, email: 'admin@test.com', password: '123456', ... }
];
```

### Issue 3: Productos no muestran en /productos
**Solución**: Verificar que ProductContext esté inicializado con datos
```javascript
// En ProductContext useEffect
if (products.length === 0) {
  // Cargar productos iniciales
  initializeProducts();
}
```

### Issue 4: Rutas protegidas no funcionan
**Solución**: Verificar ProtectedRoute.jsx
```javascript
// Debe verificar isAuthenticated() y role
if (!isAuthenticated()) navigate('/login');
```

---

## Variables de Entorno (Futuro)

Crear `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_KEY=pk_test_xxxxx
VITE_ENV=development
```

Acceder en componentes:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Seguridad

### 1. XSS Prevention
- React escapa HTML por defecto
- Evita `dangerouslySetInnerHTML`

### 2. CSRF Protection
- Implementar CSRF tokens con backend
- Verificar origen de requests

### 3. Authentication
- Usar JWT tokens con backend
- Guardar en httpOnly cookies (no localStorage)

### 4. Input Validation
- Validar en frontend y backend
- Sanitizar inputs de usuario

---

## Herramientas Recomendadas

- **VS Code Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Thunder Client (para APIs)

- **Browser Extensions**:
  - React Developer Tools
  - Redux DevTools (si usas Redux)
  - JSON Viewer

- **CLI Tools**:
  - Git
  - Node.js
  - npm o yarn

---

## Recursos Útiles

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Bootstrap Docs](https://getbootstrap.com)
- [MDN - Context API](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [Vite Guide](https://vitejs.dev)

---

**Última actualización**: Noviembre 25, 2025
**Versión**: 1.0.0
