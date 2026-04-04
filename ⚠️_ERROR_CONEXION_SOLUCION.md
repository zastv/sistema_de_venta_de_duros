# 🔴 SOLUCIÓN: Error de Conexión con la Base de Datos

## Tu Error
```
Error de conexión con la base de datos
Por favor verifica que el backend local (`http://localhost:3001`) 
esté levantado y ejecutándose.
```

## ¿Por Qué Pasa?
El **backend local no está ejecutándose** en el puerto 3001. El frontend intenta conectar y no lo encuentra.

---

## ✅ SOLUCIÓN (COPIAR Y PEGAR)

### Paso 1: Abre DOS terminales
- Terminal 1: Para el backend
- Terminal 2: Para el frontend

### Paso 2: Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

**ESPERA a que veas**:
```
Conectado a la base de datos SQLite.
Base de datos inicializada correctamente.
Servidor corriendo en http://localhost:3001
```

### Paso 3: Terminal 2 - Frontend  
**EN UNA TERMINAL NUEVA**, ejecuta:
```bash
cd frontend
npm install
npm start
```

**ESPERA a que veas**:
```
Compiled successfully!
Local: http://localhost:3000
```

### Paso 4: Abre tu navegador
```
http://localhost:3000
```

---

## ✨ Resultado Esperado
- ✅ No ves error de conexión
- ✅ Ves sabores (Oreo, Fresas Piña, Pay de Fresas)
- ✅ Puedes hacer reservas
- ✅ Panel Admin funciona

---

## 🆘 Si NO Funciona

### Error: "Puerto 3001 ya en uso"
```
lsof -i :3001
kill -9 [PID]
npm start
```

### Error: "npm: comando no encontrado"
Instala Node.js: https://nodejs.org

### Error: "Cannot find module"
```bash
cd backend && npm install
cd ../frontend && npm install
```

### NUCLEAR OPTION (último recurso)
```bash
# Borra todo y reinstala
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm -f backend/database.db

cd backend && npm install && npm start
# Nueva terminal:
cd frontend && npm install && npm start
```

---

## 🧪 Prueba Rápida de Conexión

Abre una TERCERA terminal y ejecuta:
```bash
curl http://localhost:3001/api/sabores
```

Si ves JSON con sabores = ✅ Backend OK  
Si ves error = Backend no corre

---

## 📋 Checklist Final

- [ ] Abierto 2 terminales
- [ ] Terminal 1: `cd backend && npm install && npm start`
- [ ] Veo: "Servidor corriendo en http://localhost:3001"
- [ ] Terminal 2: `cd frontend && npm install && npm start`
- [ ] Veo: "Local: http://localhost:3000"
- [ ] Navegador: http://localhost:3000
- [ ] ✅ SIN error de conexión
- [ ] ✅ Veo sabores

---

## 🎓 ¿Qué Está Pasando?

```
[Tu Navegador]
       ↓ http://localhost:3000
    [Frontend React]
       ↓ 
  supabaseClient.js
  (conecta con backend)
       ↓ fetch() HTTP
[Backend Express]
  puerto 3001
       ↓
   [SQLite DB]
```

Si Backend no está corriendo (paso 2), Frontend ve: **Connection Error**

---

## 📞 Documentación Disponible

Tenemos más archivos de ayuda:
- `TARJETA_RAPIDA.md` - Referencia rápida de comandos
- `RESUMEN_SOLUCION.md` - Explicación completa y arquitectura
- `INICIO_RAPIDO.md` - Guía detallada en español
- `backend/README.md` - Documentación técnica del backend
- `diagnostico.sh` - Script para diagnosticar problemas

---

## 🎯 Resumen

**Antes**: Usabas Supabase (online)  
**Ahora**: Usas Backend Local + SQLite  
**Por eso**: Backend DEBE estar corriendo

**Solución**: 
1. Inicia backend: `cd backend && npm start`
2. Inicia frontend: `cd frontend && npm start` (otra terminal)
3. Abre http://localhost:3000

---

**¡Eso es! Si aún hay problemas, abre DevTools (F12) y revisa la consola.**

---

*Última actualización: Abril 2026*  
*Estado: ✅ LISTO*
