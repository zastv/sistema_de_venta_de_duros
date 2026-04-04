# 🚀 Guía de Inicio - Sistema de Venta de Duros

## Requisitos Previos
- Node.js y npm instalados
- Backend y frontend con dependencias instaladas

## Pasos para Iniciar la Aplicación

### 1. Terminal 1: Iniciar el Backend
```bash
cd backend
npm start
```

Deberías ver:
```
Conectado a la base de datos SQLite.
Base de datos inicializada correctamente.
Servidor corriendo en http://localhost:3001
```

### 2. Terminal 2: Iniciar el Frontend
```bash
cd frontend
npm start
```

Deberías ver:
```
Compiled successfully!
On Your Network: http://localhost:3000
Local: http://localhost:3000
```

### 3. Abrir la Aplicación
- Abre http://localhost:3000 en tu navegador
- La aplicación debería cargar sin errores de conexión

## Estructura del Proyecto

### Backend (Puerto 3001)
- **Express.js** - Servidor web
- **SQLite** - Base de datos local
- **Rutas API**:
  - `GET /api/sabores` - Obtener sabores activos
  - `POST /api/reservas` - Crear reserva
  - `GET /api/inventario/:saborId` - Obtener inventario
  - `POST /api/inventario` - Actualizar inventario
  - Y más...

### Frontend (Puerto 3000)
- **React** - Interface de usuario
- **React Router** - Navegación
- **React Bootstrap** - Componentes UI
- **Compatible con Supabase shim** - Usa API local en lugar de Supabase

## Solucionar Problemas de Conexión

### Error: "Error de conexión con la base de datos"

**Causa**: El backend no está ejecutándose en http://localhost:3001

**Solución**:
1. Abre una terminal en la carpeta `backend`
2. Ejecuta: `npm start`
3. Espera a ver "Servidor corriendo en http://localhost:3001"
4. Recarga la página del frontend (http://localhost:3000)

### Error: "npm: comando no encontido"

**Solución**:
1. Asegúrate de tener Node.js instalado: `node --version`
2. Si no está instalado, descargalo desde https://nodejs.org

### Error: "EADDRINUSE: address already in use :::3001"

**Solución**:
1. El puerto 3001 está siendo usado por otro proceso
2. Para liberar el puerto: `lsof -i :3001` y luego `kill -9 <PID>`
3. O usa un puerto diferente: `PORT=3002 npm start` en el backend

## Acceso a la Aplicación

### Vista Pública / Reservas
- Selecciona sabor y cantidad
- Completa información de pago
- La reserva se crea en la base de datos local

### Panel de Administración
- **URL**: http://localhost:3000 → click en "👨‍💼 Admin"
- **Contraseña**: admin123
- **Funciones**:
  - Agregar nuevos sabores
  - Actualizar inventario
  - Ver ventas del día
  - Activar/desactivar sabores

## Base de Datos

### Ubicación
- Archivo: `backend/database.db`
- Se crea automáticamente al iniciar por primera vez

### Tablas
1. **sabores** - Tipos de duros disponibles
2. **inventario** - Cantidad por sabor
3. **reservas** - Registros de reservas
4. **historial_ventas** - Histórico de ventas

### Datos Iniciales
```
Sabores:
- Oreo (50 unidades)
- Fresas Piña (30 unidades)
- Pay de Fresas (40 unidades)
```

## Comandos Útiles

```bash
# Backend
cd backend && npm install    # Instalar dependencias
cd backend && npm start      # Iniciar servidor

# Frontend
cd frontend && npm install   # Instalar dependencias
cd frontend && npm start     # Iniciar aplicación
cd frontend && npm run build # Crear build para producción

# Ver puerto ocupado
lsof -i :3001
lsof -i :3000
```

## Arquitectura

```
Sistema de Venta de Duros
├── Frontend (React)
│   └── supabaseClient.js (Compatibility Shim)
│       └── Realiza llamadas a:
└── Backend (Express + SQLite)
    ├── /api/sabores
    ├── /api/inventario
    ├── /api/reservas
    ├── /api/ventas
    └── /api/admin/*
```

## Notas Importantes

- El backend **DEBE** estar ejecutándose antes de usar el frontend
- La base de datos es local (SQLite), sin dependencias de Supabase
- Todos los datos se guardan en `backend/database.db`
- El frontend se conecta automáticamente cuando el backend está disponible

---

¿Necesitas ayuda adicional? Verifica los logs en ambas terminales para mensajes de error.
