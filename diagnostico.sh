#!/bin/bash

echo "=========================================="
echo "🔍 Diagnóstico del Sistema de Venta"
echo "=========================================="
echo ""

# Check Node.js
echo "📦 Verificando Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado: $(node --version)"
else
    echo "❌ Node.js NO está instalado"
    exit 1
fi

# Check npm
echo ""
echo "📦 Verificando npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm encontrado: $(npm --version)"
else
    echo "❌ npm NO está instalado"
    exit 1
fi

# Check backend dependencies
echo ""
echo "📦 Verificando dependencias del backend..."
if [ -d "backend/node_modules" ]; then
    echo "✅ Dependencias del backend instaladas"
else
    echo "⚠️  Dependencias del backend NO instaladas"
    echo "   Ejecuta: cd backend && npm install"
fi

# Check frontend dependencies
echo ""
echo "📦 Verificando dependencias del frontend..."
if [ -d "frontend/node_modules" ]; then
    echo "✅ Dependencias del frontend instaladas"
else
    echo "⚠️  Dependencias del frontend NO instaladas"
    echo "   Ejecuta: cd frontend && npm install"
fi

# Check backend file
echo ""
echo "📄 Verificando archivos del backend..."
if [ -f "backend/server.js" ]; then
    echo "✅ server.js encontrado"
else
    echo "❌ server.js NO encontrado"
fi

if [ -f "backend/schema.sql" ]; then
    echo "✅ schema.sql encontrado"
else
    echo "❌ schema.sql NO encontrado"
fi

# Check frontend files
echo ""
echo "📄 Verificando archivos del frontend..."
if [ -f "frontend/src/supabaseClient.js" ]; then
    echo "✅ supabaseClient.js encontrado"
else
    echo "❌ supabaseClient.js NO encontrado"
fi

if [ -f "frontend/src/admin/Admin.js" ]; then
    echo "✅ Admin.js encontrado"
else
    echo "❌ Admin.js NO encontrado"
fi

if [ -f "frontend/src/reservar/Reservar.js" ]; then
    echo "✅ Reservar.js encontrado"
else
    echo "❌ Reservar.js NO encontrado"
fi

# Check ports availability
echo ""
echo "🔌 Verificando puertos..."
if ! lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Puerto 3001 está disponible"
else
    echo "⚠️  Puerto 3001 está en uso (backend podría estar ejecutándose)"
fi

if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Puerto 3000 está disponible"
else
    echo "⚠️  Puerto 3000 está en uso (frontend podría estar ejecutándose)"
fi

# Summary
echo ""
echo "=========================================="
echo "✅ Diagnóstico completado"
echo "=========================================="
echo ""
echo "Próximos pasos:"
echo "1. Terminal 1: cd backend && npm start"
echo "2. Terminal 2: cd frontend && npm start"
echo "3. Abre http://localhost:3000"
echo ""
