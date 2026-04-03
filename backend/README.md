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