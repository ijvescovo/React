# 🛍️ TechStore - E-commerce

Un proyecto de tienda en línea completamente funcional desarrollado con **HTML, CSS y JavaScript** (sin frameworks).

## 📋 Características

### ✨ Funcionalidades Principales
- 🏠 **Página de inicio** con hero section atractivo
- 🛒 **Carrito de compras** con persistencia en localStorage
- 🔍 **Búsqueda y filtros** por categoría y precio
- 📱 **Diseño responsivo** para todos los dispositivos
- 🎯 **Modal de detalles** del producto
- 💾 **Almacenamiento local** del carrito
- 📊 **Gestión de inventario** con stock disponible
- ⭐ **Sistema de rating** de productos
- 🎨 **Interfaz moderna** con animaciones

### 📦 Productos Incluidos
- Laptops (MacBook Pro, Dell XPS, etc.)
- Teléfonos (iPhone 15, Samsung Galaxy S24)
- Tablets (iPad Air, Lenovo Tab)
- Accesorios (AirPods, Apple Watch)

## 📁 Estructura del Proyecto

```
ecommerce/
├── index.html       # Estructura HTML (Markup)
├── styles.css       # Estilos CSS (Presentación)
└── script.js        # Lógica JavaScript (Funcionalidad)
```

## 🚀 Cómo Usar

### 1. Abrir el Proyecto
Simplemente abre el archivo `index.html` en tu navegador favorito.

```bash
# En Windows
start index.html

# En Mac
open index.html

# En Linux
xdg-open index.html
```

### 2. O usa un servidor local (Recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (si tienes http-server instalado)
http-server
```

Luego accede a `http://localhost:8000`

## 🎮 Uso de la Aplicación

### Navegación
- **Inicio**: Ver la página principal con hero banner
- **Productos**: Ver todos los productos con opciones de búsqueda
- **Acerca de**: Información sobre la tienda

### Comprar Productos
1. Haz clic en "Productos"
2. Usa la barra de búsqueda o los filtros
3. Haz clic en "Ver Detalles" en un producto
4. Selecciona la cantidad y agrega al carrito
5. Abre el carrito (icono 🛒)
6. Revisa tu compra y procede al pago

### Gestión del Carrito
- ➕ Aumentar cantidad de un producto
- ➖ Disminuir cantidad de un producto
- 🗑️ Eliminar producto
- 💳 Proceder al pago
- 🧹 Vaciar carrito

## 🔍 Funcionalidades Detalladas

### Sistema de Búsqueda
```javascript
// Búsqueda en tiempo real
// Busca en nombre y descripción del producto
```

### Filtros
- **Por Categoría**: Laptops, Teléfonos, Tablets, Accesorios
- **Por Precio**: 
  - $0 - $500
  - $500 - $1000
  - $1000 - $2000
  - $2000+

### Carrito Persistente
El carrito se guarda automáticamente en `localStorage`, lo que significa:
- Los productos se mantienen al recargar la página
- Se conservan entre sesiones del navegador
- Los datos se almacenan localmente en tu dispositivo

### Modalidad de Detalles
Cada producto tiene un modal con:
- Imagen/emoji del producto
- Descripción completa
- Precio
- Rating con cantidad de reviews
- Stock disponible
- Selector de cantidad

## 💻 Detalles Técnicos

### HTML (index.html)
- Estructura semántica
- Formularios accesibles
- Elementos multimedia
- Atributos data para JavaScript

### CSS (styles.css)
- Variables CSS para temas
- Grid y Flexbox para layouts
- Media queries responsive
- Animaciones y transiciones
- Gradientes y efectos visuales

### JavaScript (script.js)
- Programación orientada a funciones
- Event listeners
- DOM manipulation
- localStorage API
- Métodos de array (map, filter, reduce)
- Funciones puras y reutilizables

## 🎨 Personalización

### Cambiar Colores
Edita las variables en `styles.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* ... más colores ... */
}
```

### Agregar Productos
En `script.js`, agrega objetos al array `PRODUCTS`:
```javascript
{
    id: 9,
    name: 'Nuevo Producto',
    category: 'laptops',
    price: 999.99,
    image: '💻',
    description: 'Descripción del producto',
    rating: 4.5,
    stock: 10,
    reviews: 50
}
```

## 📱 Compatibilidad

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Opera 76+

Funciona en:
- 💻 Computadoras (Desktop)
- 📱 Tablets
- 📲 Smartphones

## 🐛 Troubleshooting

### El carrito no guarda los productos
- Verifica que localStorage esté habilitado en tu navegador
- Intenta en modo normal (no incógnito)
- Revisa la consola del navegador (F12)

### Los estilos no cargan correctamente
- Asegúrate de que `styles.css` esté en la misma carpeta
- Recarga la página (Ctrl + F5 o Cmd + Shift + R)
- Limpia el caché del navegador

### JavaScript no funciona
- Revisa la consola (F12 > Console)
- Asegúrate de que `script.js` está en la misma carpeta
- Verifica que JavaScript esté habilitado

## 📝 Código Destacado

### Agregar al Carrito
```javascript
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    saveCart();
}
```

### Filtrar Productos
```javascript
function getFilteredProducts() {
    return PRODUCTS.filter(product => {
        if (currentFilter.category && product.category !== currentFilter.category)
            return false;
        if (currentFilter.price && !checkPriceRange(product.price))
            return false;
        if (currentFilter.search && !matchesSearch(product))
            return false;
        return true;
    });
}
```

## 📚 Recursos Utilizados

- HTML5 Semántico
- CSS3 (Grid, Flexbox, Variables)
- JavaScript ES6+ (const, arrow functions, destructuring)
- LocalStorage API
- Intl API (formato de moneda)

## 🎓 Aprendizajes Clave

Este proyecto enseña:
- Manipulación del DOM
- Event handling
- Almacenamiento con localStorage
- Manejo de estado
- Gestión de datos
- Diseño responsivo
- Buenas prácticas de código

## ⚖️ Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## 👨‍💻 Autor

Proyecto de e-commerce educativo desarrollado con HTML, CSS y JavaScript vanilla.

## 📞 Soporte

Para reportar problemas o sugerencias, revisa el código y los comentarios incluidos en cada archivo.

---

¡Gracias por usar TechStore! 🎉
