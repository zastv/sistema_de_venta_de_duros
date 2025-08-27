# Hugo's Delights - Sistema de Reserva de Duros

Un sistema web completo para gestionar la reserva y venta de duros artesanales con interfaz moderna y funcional.

## Características

- **Panel de Administración**: Gestiona sabores, inventario y consulta ventas del día
- **Sistema de Reservas**: Los usuarios pueden reservar duros seleccionando sabor, cantidad y método de pago
- **Historial Completo**: Visualiza el historial de reservas y ventas con filtros por fecha
- **Diseño Responsive**: Interfaz moderna y adaptable a dispositivos móviles
- **Base de Datos en Tiempo Real**: Integración con Supabase para persistencia de datos

## Tecnologías Utilizadas

- **Frontend**: React.js con React Bootstrap
- **Backend**: Supabase (PostgreSQL)
- **Estilos**: Bootstrap 5 + CSS personalizado
- **Navegación**: React Router DOM

## Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd sistema_de_venta_de_duros
   ```

2. **Configurar la base de datos en Supabase**
   - Ejecuta los scripts SQL del archivo `backend/supabase_tables.sql` en tu proyecto de Supabase

3. **Instalar dependencias del frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Configurar variables de entorno**
   - Las credenciales de Supabase ya están incluidas en el archivo `.env`

5. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

## Estructura del Proyecto

```
sistema_de_venta_de_duros/
├── frontend/
│   ├── src/
│   │   ├── admin/          # Panel de administración
│   │   ├── reservar/       # Sistema de reservas
│   │   ├── historial/      # Historial de ventas
│   │   ├── components/     # Componentes compartidos
│   │   └── supabaseClient.js
│   └── package.json
└── backend/
    └── supabase_tables.sql # Esquema de base de datos
```

## Funcionalidades

### Panel de Administración
- Agregar nuevos sabores de duros
- Activar/desactivar sabores
- Actualizar inventario por sabor
- Visualizar ventas del día en tiempo real
- Sistema de autenticación con contraseña

### Sistema de Reservas
- Selección de sabor con disponibilidad en tiempo real
- Elección de cantidad (validada contra inventario)
- Métodos de pago: Efectivo, Transferencia, Yappy
- Información detallada de pago para cada método
- Actualización automática del inventario

### Historial
- Vista de reservas con detalles completos
- Historial de ventas consolidado
- Filtros por fecha
- Contadores de totales

## Base de Datos

El sistema utiliza 4 tablas principales:

- **sabores**: Catálogo de sabores disponibles
- **inventario**: Cantidad disponible por sabor y fecha
- **reservas**: Registro de reservas de usuarios
- **historial_ventas**: Histórico consolidado de ventas

## Métodos de Pago Soportados

- 💵 **Efectivo**: Pago en efectivo al momento de entrega
- 🏦 **Transferencia**: Transferencia bancaria con datos completos
- 📱 **Yappy**: Pago mediante la aplicación Yappy

## Precios

- **Precio por duro**: $0.75
- **Cálculo automático** del total según cantidad

## Información de Contacto

- **WhatsApp**: 6123-4567 (confirmaciones de pago)
- **Yappy**: 6123-4567
- **Transferencias**: Hugo's Delights

## Licencia

Este proyecto es de uso libre para fines educativos y comerciales.
