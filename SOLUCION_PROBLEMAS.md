# Solución de Problemas de Conexión con Supabase

## Error 401 - Unauthorized

Si ves errores 401 al intentar usar la aplicación, sigue estos pasos:

### 1. Ejecutar los Scripts SQL Actualizados

Ve a tu proyecto en Supabase y ejecuta el contenido completo del archivo `backend/supabase_tables.sql` en el SQL Editor. Este archivo ahora incluye:

- Creación de todas las tablas
- Configuración de Row Level Security (RLS)
- Políticas que permiten acceso público a todas las operaciones
- Datos de ejemplo para probar la app

### 2. Verificar la Configuración

En el dashboard de Supabase:

1. **Verifica las tablas**: Ve a Table Editor y confirma que existen las 4 tablas:
   - `sabores`
   - `inventario` 
   - `reservas`
   - `historial_ventas`

2. **Verifica las políticas RLS**: Cada tabla debe tener una política llamada "Allow all operations" habilitada.

3. **Verifica los datos**: La tabla `sabores` debe tener algunos sabores de ejemplo, y la tabla `inventario` debe tener cantidades iniciales.

### 3. Reiniciar la Aplicación

Después de ejecutar los scripts SQL:

```bash
cd frontend
npm start
```

### 4. Verificación de Conexión

La aplicación ahora incluye una verificación automática de conexión. Si hay problemas, verás un mensaje de error en el panel de administración.

### Scripts SQL Incluyen:

- ✅ Creación de tablas con las relaciones correctas
- ✅ Habilitación de Row Level Security (RLS)
- ✅ Políticas que permiten acceso completo (apropiado para desarrollo/demo)
- ✅ Datos de ejemplo para pruebas inmediatas
- ✅ Inventario inicial para cada sabor

Una vez ejecutados estos scripts, la aplicación debería funcionar sin errores de autorización.
