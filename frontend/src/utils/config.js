// Configuración del sistema
export const PRECIO_POR_DURO = 0.75;

// Función para calcular totales
export const calcularTotal = (cantidad) => {
  return (cantidad * PRECIO_POR_DURO).toFixed(2);
};

// Función para formatear precio
export const formatearPrecio = (precio) => {
  return `$${precio}`;
};
