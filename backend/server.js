const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    // Inicializar la base de datos
    initializeDatabase();
  }
});

// Inicializar la base de datos con el esquema
function initializeDatabase() {
  const fs = require('fs');
  const path = require('path');
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  db.exec(schema, (err) => {
    if (err) {
      console.error('Error inicializando la base de datos:', err.message);
    } else {
      console.log('Base de datos inicializada correctamente.');
    }
  });
}

// Rutas de la API

// Obtener sabores activos
app.get('/api/sabores', (req, res) => {
  db.all('SELECT * FROM sabores WHERE activo = 1 ORDER BY nombre', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obtener inventario para un sabor
app.get('/api/inventario/:saborId', (req, res) => {
  const { saborId } = req.params;
  db.get('SELECT cantidad FROM inventario WHERE sabor_id = ? ORDER BY fecha DESC LIMIT 1', [saborId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ cantidad: row ? row.cantidad : 0 });
  });
});

// Crear reserva
app.post('/api/reservas', (req, res) => {
  const { usuario, sabor_id, cantidad, metodo_pago } = req.body;

  // Verificar inventario
  db.get('SELECT cantidad FROM inventario WHERE sabor_id = ? ORDER BY fecha DESC LIMIT 1', [sabor_id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const cantidadDisponible = row ? row.cantidad : 0;
    if (cantidad > cantidadDisponible) {
      res.status(400).json({ error: `Solo hay ${cantidadDisponible} duros disponibles` });
      return;
    }

    // Insertar reserva
    db.run('INSERT INTO reservas (usuario, sabor_id, cantidad, metodo_pago) VALUES (?, ?, ?, ?)',
      [usuario, sabor_id, cantidad, metodo_pago], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        // Insertar en historial de ventas
        db.run('INSERT INTO historial_ventas (sabor_id, cantidad) VALUES (?, ?)',
          [sabor_id, cantidad], function(err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }

            // Actualizar inventario
            const nuevaCantidad = cantidadDisponible - cantidad;
            db.run('INSERT INTO inventario (sabor_id, cantidad, fecha) VALUES (?, ?, date("now"))',
              [sabor_id, nuevaCantidad], function(err) {
                if (err) {
                  res.status(500).json({ error: err.message });
                  return;
                }
                res.json({ id: this.lastID, message: 'Reserva realizada exitosamente' });
              });
          });
      });
  });
});

// Obtener reservas
app.get('/api/reservas', (req, res) => {
  const { fecha } = req.query;
  let query = `
    SELECT r.*, s.nombre as sabor_nombre, s.activo as sabor_activo
    FROM reservas r
    JOIN sabores s ON r.sabor_id = s.id
  `;
  let params = [];

  if (fecha) {
    query += ' WHERE date(r.fecha) = ?';
    params.push(fecha);
  }

  query += ' ORDER BY r.fecha DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obtener ventas
app.get('/api/ventas', (req, res) => {
  const { fecha } = req.query;
  let query = `
    SELECT hv.*, s.nombre as sabor_nombre, s.activo as sabor_activo
    FROM historial_ventas hv
    JOIN sabores s ON hv.sabor_id = s.id
  `;
  let params = [];

  if (fecha) {
    query += ' WHERE date(hv.fecha) = ?';
    params.push(fecha);
  }

  query += ' ORDER BY hv.fecha DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obtener ventas de hoy
app.get('/api/ventas-hoy', (req, res) => {
  const query = `
    SELECT hv.*, s.nombre as sabor_nombre
    FROM historial_ventas hv
    JOIN sabores s ON hv.sabor_id = s.id
    WHERE date(hv.fecha) = date('now')
    ORDER BY hv.fecha DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Obtener todos los sabores (para admin)
app.get('/api/admin/sabores', (req, res) => {
  db.all('SELECT * FROM sabores ORDER BY nombre', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Actualizar estado de sabor
app.put('/api/admin/sabores/:id', (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  db.run('UPDATE sabores SET activo = ? WHERE id = ?', [activo ? 1 : 0, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Sabor actualizado' });
  });
});

// Agregar nuevo sabor
app.post('/api/admin/sabores', (req, res) => {
  const { nombre } = req.body;

  db.run('INSERT INTO sabores (nombre, activo) VALUES (?, 1)', [nombre], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: 'Sabor agregado' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});