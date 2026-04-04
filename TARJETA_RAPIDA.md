# ⚡ TARJETA DE REFERENCIA RÁPIDA

## El Error
```
Error de conexión con la base de datos
Por favor verifica que el backend local 
(`http://localhost:3001`) esté levantado 
y ejecutándose.
```

## La Solución (3 Pasos)

### ✅ Paso 1: Primera vez solamente
```bash
cd backend
npm install
cd ../frontend  
npm install
```

### ✅ Paso 2: Terminal 1 - Inicia Backend
```bash
cd backend
npm start
```
**Espera a ver**: `Servidor corriendo en http://localhost:3001`

### ✅ Paso 3: Terminal 2 - Inicia Frontend
```bash
cd frontend
npm start
```
**Espera a ver**: `Local: http://localhost:3000`

## ✨ Resultado
Abre http://localhost:3000 - ¡Todo debe funcionar!

---

## 🆘 Si Algo Falla

### "Puerto ya está en uso"
```bash
# En terminal 1, si falla el backend:
lsof -i :3001
kill -9 <PID>
# Luego: npm start
```

### "Cannot find module"
```bash
cd backend
npm install

cd ../frontend
npm install
```

### "No funciona"
```bash
# Verifica que backend responda:
curl http://localhost:3001/api/sabores

# Si ves JSON = ✅ Backend OK
# Si ves error = Reinicia backend
```

---

## 📋 Checklist
- [ ] Backend instalado: `cd backend && npm install`
- [ ] Backend corriendo: terminal muestra "Servidor corriendo..."
- [ ] Frontend instalado: `cd frontend && npm install`
- [ ] Frontend corriendo: terminal muestra "Local: http://localhost:3000"
- [ ] Navegador abierto: http://localhost:3000
- [ ] ❌ No hay error de conexión
- [ ] ✅ Ves los sabores listados
- [ ] ✅ Panel Admin funciona

---

## 🎯 URLs Importantes

| Función | URL |
|---------|-----|
| **App Principal** | http://localhost:3000 |
| **Backend API** | http://localhost:3001/api |
| **Verificar Backend** | http://localhost:3001/api/sabores |
| **Admin Panel** | http://localhost:3000 → Click "Admin" |

---

## 🔐 Credenciales Admin
- **Usuario**: admin
- **Contraseña**: admin123

---

## 📁 Estructura

```
proyecto/
├── backend/
│   ├── server.js (✨ El servidor)
│   ├── database.db (📦 Base de datos - se crea sola)
│   ├── schema.sql
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── supabaseClient.js (🔗 Conecta con backend)
│   │   ├── admin/Admin.js
│   │   ├── reservar/Reservar.js
│   │   └── historial/Historial.js
│   └── package.json
│
└── [Documentación]
    ├── RESUMEN_SOLUCION.md ← Estás aquí
    ├── INICIO_RAPIDO.md
    └── backend/README.md
```

---

## 🚨 Orden Correcto

```
IMPORTANTE: Backend PRIMERO, Frontend DESPUÉS
```

Esto es lo QUE NO hacer:
```
❌ Iniciar frontend primero
❌ Olvidar npm install
❌ Usar puertos equivocados
❌ No esperar a que backend esté listo
```

Esto es lo QUE hacer:
```
✅ npm install en backend
✅ npm install en frontend
✅ npm start en backend (esperar mensaje)
✅ npm start en frontend (en otra terminal)
```

---

## 🎓 ¿Por Qué Pasa Esto?

Backend = Base de datos + API
Frontend = La interfaz que ves

Frontend necesita Backend para:
- Obtener lista de sabores
- Guardar reservas
- Leer inventario
- Ver historial

Por eso si Backend no está corriendo, Frontend ve: "Error de conexión"

---

## 💡 Trucos

### Recarga sin caché
```
Ctrl+Shift+R  (Windows/Linux)
Cmd+Shift+R   (Mac)
```

### Ver errores
```
F12 = Abre DevTools
Console = Ver mensajes de error
Network = Ver peticiones al backend
```

### Limpiar todo (último recurso)
```bash
# Backend
rm -f backend/database.db
cd backend && npm start

# Frontend (nueva terminal)
cd frontend && npm start
```

---

## ✅ Verificación Final

```bash
# En terminal 3 (nueva):

# 1. Backend responde?
curl http://localhost:3001/api/sabores
# Deberías ver: JSON con sabores

# 2. Frontend carga?
curl http://localhost:3000
# Deberías ver: código HTML

# 3. Todo bien!
# Abre http://localhost:3000 en navegador
```

---

**Última actualización**: Abril 2026  
**Estado**: ✅ Listo para usar
