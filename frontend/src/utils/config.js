// Configuración del sistema
export const PRECIO_POR_DURO = 1.00;

// Función para calcular totales
export const calcularTotal = (cantidad) => {
  return (cantidad * PRECIO_POR_DURO).toFixed(2);
};

// Función para formatear precio
export const formatearPrecio = (precio) => {
  return `$${precio}`;
};
