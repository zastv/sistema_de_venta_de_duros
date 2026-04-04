# Backend Local para Sistema de Venta de Duros

Este backend proporciona una API REST local usando SQLite para el sistema de venta de duros.

## Instalación

1. Navega al directorio backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para iniciar el servidor:
```bash
npm start
```

O para desarrollo con recarga automática:
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3001`.

## Base de Datos

La base de datos SQLite se crea automáticamente en `database.db` con datos iniciales.

### Tablas

- **sabores**: Sabores disponibles
- **inventario**: Cantidad disponible por sabor
- **reservas**: Reservas realizadas
- **historial_ventas**: Historial de ventas

## API Endpoints

### Sabores
- `GET /api/sabores` - Obtener sabores activos
- `GET /api/admin/sabores` - Obtener todos los sabores
- `POST /api/admin/sabores` - Crear nuevo sabor
- `PUT /api/admin/sabores/:id` - Actualizar sabor

### Inventario
- `GET /api/inventario/:saborId` - Obtener inventario para un sabor

### Reservas
- `GET /api/reservas` - Obtener todas las reservas
- `POST /api/reservas` - Crear nueva reserva

### Ventas
- `GET /api/ventas` - Obtener historial de ventas
- `GET /api/ventas-hoy` - Obtener ventas de hoy

## 🔗 Conexión Frontend-Backend

El frontend en `../frontend/src/supabaseClient.js` se conecta automáticamente a este backend.

### Verificar Conexión
```bash
# Desde otra terminal, verifica que el backend responda
curl http://localhost:3001/api/sabores

# Deberías recibir un JSON con los sabores
```

## 🐛 Solucionar Problemas de Conexión

### Error en Frontend: "Error de conexión con la base de datos"

**Causa Probable**: El backend no está ejecutándose en puerto 3001

**Solución**:
1. Abre una terminal
2. Navega a la carpeta backend: `cd backend`
3. Ejecuta: `npm start`
4. Deberías ver estos mensajes:
   ```
   Conectado a la base de datos SQLite.
   Base de datos inicializada correctamente.
   Servidor corriendo en http://localhost:3001
   ```
5. Vuelve al frontend y recarga la página

### Error: "EADDRINUSE: address already in use :::3001"

**Causa**: Puerto 3001 ya está en uso

**Soluciones**:
```bash
# Opción 1: Liberar el puerto
lsof -i :3001
kill -9 <PID>

# Opción 2: Usar otro puerto
PORT=3002 npm start
# Nota: También necesitarías actualizar API_BASE_URL en frontend/src/supabaseClient.js
```

### Error: "Cannot find module 'express'"

**Causa**: Las dependencias no están instaladas

**Solución**:
```bash
npm install
npm start
```

### El backend inicia pero frontend no conecta

**Verificar CORS**:
- Backend tiene `app.use(cors())` habilitado ✅
- Frontend en `http://localhost:3000` puede conectar a `http://localhost:3001` ✅

**Verificar firewall**:
```bash
# Prueba conectar desde el navegador
# Abre http://localhost:3001/api/sabores
# Deberías ver JSON con sabores, no error
```

### Base de datos corrupta o vacía

**Solución**:
```bash
# Elimina la base de datos
rm -f database.db

# Reinicia el servidor (recreará la DB con datos iniciales)
npm start
```

## ✅ Checklist Final

- [ ] `npm start` ejecuta sin errores
- [ ] Mensaje: "Servidor corriendo en http://localhost:3001"
- [ ] `curl http://localhost:3001/api/sabores` devuelve JSON
- [ ] Frontend conecta sin error de base de datos
- [ ] Puedo ver sabores activos en la interfaz

## 📝 Notas Importantes

- Backend **DEBE** estar ejecutándose antes de usar el frontend
- Base de datos se crea automáticamente en primer inicio
- Si cambias puertos, también debes actualizar `API_BASE_URL` en frontend
- Los datos persisten en `database.db` (no se pierden entre reinicios)