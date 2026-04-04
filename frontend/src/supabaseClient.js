const API_BASE_URL = 'http://localhost:3001/api';

// Función para verificar la conexión
export const verificarConexion = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sabores`);
    return response.ok;
  } catch (error) {
    console.error('Error verificando conexión:', error);
    return false;
  }
};

// API client functions
export const apiClient = {
  // Sabores
  getSabores: async () => {
    const response = await fetch(`${API_BASE_URL}/sabores`);
    if (!response.ok) throw new Error('Error fetching sabores');
    return await response.json();
  },

  // Inventario
  getInventario: async (saborId) => {
    const response = await fetch(`${API_BASE_URL}/inventario/${saborId}`);
    if (!response.ok) throw new Error('Error fetching inventario');
    return await response.json();
  },

  // Reservas
  createReserva: async (reserva) => {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error creating reserva');
    }
    return await response.json();
  },

  getReservas: async (fecha = null) => {
    const url = fecha ? `${API_BASE_URL}/reservas?fecha=${fecha}` : `${API_BASE_URL}/reservas`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching reservas');
    return await response.json();
  },

  // Ventas
  getVentas: async (fecha = null) => {
    const url = fecha ? `${API_BASE_URL}/ventas?fecha=${fecha}` : `${API_BASE_URL}/ventas`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching ventas');
    return await response.json();
  },

  getVentasHoy: async () => {
    const response = await fetch(`${API_BASE_URL}/ventas-hoy`);
    if (!response.ok) throw new Error('Error fetching ventas hoy');
    return await response.json();
  },

  // Admin
  getAllSabores: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/sabores`);
    if (!response.ok) throw new Error('Error fetching all sabores');
    return await response.json();
  },

  updateSabor: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/admin/sabores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error updating sabor');
    return await response.json();
  },

  createSabor: async (nombre) => {
    const response = await fetch(`${API_BASE_URL}/admin/sabores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) throw new Error('Error creating sabor');
    return await response.json();
  },

  updateInventario: async ({ sabor_id, cantidad }) => {
    const response = await fetch(`${API_BASE_URL}/inventario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sabor_id, cantidad }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error updating inventario');
    }
    return await response.json();
  },
};

// Simular el cliente de Supabase para compatibilidad
export const supabase = {
  from: (table) => ({
    select: (columns) => ({
      eq: (column, value) => ({
        order: (column, options) => ({
          limit: (limit) => selectFromTable(table, { eq: { column, value }, order: { column, ascending: options?.ascending } }, limit)
        }),
        limit: (limit) => selectFromTable(table, { eq: { column, value } }, limit)
      }),
      order: (column, options) => ({
        limit: (limit) => selectFromTable(table, { order: { column, ascending: options?.ascending } }, limit)
      }),
      gte: (column, value) => ({
        lte: (column2, value2) => selectFromTable(table, { gte: { column, value }, lte: { column2, value2 } })
      })
    }),
    insert: (data) => insertIntoTable(table, data),
    update: (data) => ({
      eq: (column, value) => updateTable(table, data, { column, value })
    }),
    upsert: (data) => upsertTable(table, data)
  })
};

async function selectFromTable(table, filters = {}, limit = null) {
  try {
    let data;
    if (table === 'sabores') {
      if (filters.eq && filters.eq.column === 'activo' && filters.eq.value === true) {
        data = await apiClient.getSabores();
      } else {
        data = await apiClient.getAllSabores();
      }
    } else if (table === 'inventario') {
      // Para inventario, obtener cantidad para un sabor específico
      if (filters.eq && filters.eq.column === 'sabor_id') {
        const inv = await apiClient.getInventario(filters.eq.value);
        data = [{ cantidad: inv.cantidad }];
      } else {
        // Si no hay filtro, obtener para todos los sabores
        const sabores = await apiClient.getSabores();
        const inventarioPromises = sabores.map(async (sabor) => {
          const inv = await apiClient.getInventario(sabor.id);
          return { sabor_id: sabor.id, cantidad: inv.cantidad };
        });
        data = await Promise.all(inventarioPromises);
      }
    } else if (table === 'historial_ventas') {
      if (filters.gte && filters.lte) {
        const fecha = filters.gte.value.split('T')[0];
        data = await apiClient.getVentas(fecha);
      } else {
        data = await apiClient.getVentasHoy();
      }
      // Transformar para que coincida con el formato esperado
      data = data.map(item => ({
        ...item,
        sabores: { nombre: item.sabor_nombre, activo: item.sabor_activo }
      }));
    } else if (table === 'reservas') {
      if (filters.gte && filters.lte) {
        const fecha = filters.gte.value.split('T')[0];
        data = await apiClient.getReservas(fecha);
      } else {
        data = await apiClient.getReservas();
      }
      // Transformar para que coincida con el formato esperado
      data = data.map(item => ({
        ...item,
        sabores: { nombre: item.sabor_nombre, activo: item.sabor_activo }
      }));
    }

    if (filters.order) {
      const ascending = filters.order.ascending !== false;
      data.sort((a, b) => {
        const aVal = a[filters.order.column];
        const bVal = b[filters.order.column];
        if (aVal === bVal) return 0;
        if (ascending) {
          return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
      });
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function insertIntoTable(table, data) {
  try {
    if (table === 'reservas') {
      await apiClient.createReserva(data[0]);
      return { data: null, error: null };
    } else if (table === 'inventario') {
      await apiClient.updateInventario(data[0]);
      return { data: null, error: null };
    } else if (table === 'sabores') {
      const result = await apiClient.createSabor(data[0].nombre);
      return {
        data: [{ id: result.id, nombre: data[0].nombre, activo: true }],
        error: null,
      };
    }
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function updateTable(table, data, condition) {
  try {
    if (table === 'sabores') {
      await apiClient.updateSabor(condition.value, data);
    }
    return { error: null };
  } catch (error) {
    return { error };
  }
}

async function upsertTable(table, data) {
  return insertIntoTable(table, data);
}
