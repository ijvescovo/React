# 🚀 Deployment - TechStore E-Commerce

## Opciones de Deployment

### 1. **Vercel** (Recomendado - Más fácil)

#### Pasos:
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desplegar
vercel

# Seguir las instrucciones en la terminal
```

#### O por GitHub:
```bash
# 1. Push a GitHub
git add .
git commit -m "Deploy TechStore"
git push origin main

# 2. Ir a https://vercel.com
# 3. Import project desde GitHub
# 4. Click Deploy
```

**Resultado**: App disponible en `techstore.vercel.app`

---

### 2. **Netlify**

#### Pasos:
```bash
# 1. Compilar proyecto
npm run build

# 2. Instalar Netlify CLI
npm install -g netlify-cli

# 3. Desplegar
netlify deploy --prod --dir=dist
```

#### O por GitHub:
```bash
# 1. Ir a https://netlify.com
# 2. Connect your repository
# 3. Build command: npm run build
# 4. Publish directory: dist
# 5. Click Deploy
```

**Resultado**: App disponible en `techstore.netlify.app`

---

### 3. **GitHub Pages**

#### Pasos:

1. **Modificar vite.config.js**:
```javascript
export default {
  base: '/ecommerce-react/',  // O solo '/' si es user/org page
  // ... resto de configuración
}
```

2. **Desplegar**:
```bash
npm run build
git add dist
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. **Configurar en GitHub**:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /dist
   - Click Save

**Resultado**: App disponible en `username.github.io/ecommerce-react`

---

### 4. **Heroku** (Requiere backend)

#### Pasos:
```bash
# 1. Instalar Heroku CLI
npm install -g heroku

# 2. Login en Heroku
heroku login

# 3. Crear app
heroku create techstore-app

# 4. Configurar buildpack
heroku buildpacks:set mars/create-react-app

# 5. Desplegar
git push heroku main
```

**Resultado**: App disponible en `techstore-app.herokuapp.com`

---

### 5. **AWS Amplify**

#### Pasos:
```bash
# 1. Instalar AWS Amplify CLI
npm install -g @aws-amplify/cli

# 2. Inicializar
amplify init

# 3. Agregar hosting
amplify add hosting

# 4. Desplegar
amplify publish
```

**Resultado**: App disponible en AWS Amplify

---

## 📋 Checklist Pre-Deployment

- [ ] `npm run build` ejecuta sin errores
- [ ] `npm run lint` no tiene warnings críticos
- [ ] Todas las rutas funcionan correctamente
- [ ] localStorage funciona en navegador
- [ ] No hay console errors
- [ ] Responsivo en mobile/tablet
- [ ] Botones y formularios funcionan
- [ ] Las imágenes se cargan correctamente

---

## 🔧 Configuración de Producción

### Variables de Entorno

Crear archivo `.env.production`:

```bash
VITE_API_URL=https://tu-api.com
VITE_ENV=production
```

### Optimizaciones

1. **Minimizar assets**:
```bash
npm run build
```

2. **Comprimir imágenes**:
```bash
npm install -g imagemin-cli
imagemin src/assets/**/* --out-dir=src/assets-optimized/
```

3. **Lazy Loading**:
```javascript
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));

// En router:
<Suspense fallback={<div>Cargando...</div>}>
  <Route path="/admin" element={<Admin />} />
</Suspense>
```

---

## 📊 Monitoreo

### Vercel Analytics
- Automático si usas Vercel
- Dashboard en vercel.com

### Sentry (Error Tracking)
```bash
npm install @sentry/react

# En main.jsx:
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "tu-dsn-aqui",
  environment: "production",
});
```

### Google Analytics
```bash
npm install react-ga4

# En main.jsx:
import ReactGA from "react-ga4";
ReactGA.initialize("G-XXXXXXXXXX");
```

---

## 🔒 Seguridad Pre-Deployment

1. **Nunca commits secrets**:
```bash
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

2. **Revisar dependencias**:
```bash
npm audit
npm audit fix
```

3. **HTTPS obligatorio**:
   - Todos los deployment mencionados usan HTTPS por defecto

4. **Headers de seguridad**:
   - Se configuran automáticamente en Vercel/Netlify

---

## 📈 Alternativa: Deployment Manual

### En tu servidor VPS

```bash
# 1. En tu servidor
ssh user@tu-servidor.com
cd /var/www

# 2. Clone tu repo
git clone https://github.com/tu-usuario/ecommerce-react.git
cd ecommerce-react

# 3. Instalar dependencias
npm install
npm run build

# 4. Usar PM2 para ejecutar
npm install -g pm2
pm2 start "npm run preview" --name "techstore"
pm2 startup
pm2 save

# 5. Configurar Nginx/Apache como proxy
# Proxy traffic a http://localhost:4173 (puerto de preview)
```

**Nginx config ejemplo**:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🎯 Recomendación Final

**Para este proyecto**: Usa **Vercel** porque:
- ✅ Gratis
- ✅ Super fácil (3 clics)
- ✅ Deploy automático desde GitHub
- ✅ Excelente rendimiento
- ✅ Soporte React out of the box

---

## 📝 Después del Deployment

1. **Tomar screenshot** de la app en producción
2. **Copiar URL** en la entrega
3. **Probar todas las funcionalidades** desde la URL
4. **Reportar cualquier issue** encontrado

---

## ✅ Checkpoints Después de Deploy

- [ ] Home page carga correctamente
- [ ] Puede navegar a /productos
- [ ] Filtros funcionan
- [ ] Puede agregar items al carrito
- [ ] Puede hacer login/registro
- [ ] Si es admin, puede acceder a /admin
- [ ] CRUD de productos funciona en admin
- [ ] Datos persisten (refrescar página)
- [ ] Responsive en mobile

---

**¡Listo para entregar! 🎉**
