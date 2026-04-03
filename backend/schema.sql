-- Tabla de sabores
DROP TABLE IF EXISTS sabores;
CREATE TABLE sabores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  activo BOOLEAN DEFAULT 1
);

-- Tabla de inventario
DROP TABLE IF EXISTS inventario;
CREATE TABLE inventario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sabor_id INTEGER,
  cantidad INTEGER NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (sabor_id) REFERENCES sabores(id) ON DELETE CASCADE
);

-- Tabla de reservas
DROP TABLE IF EXISTS reservas;
CREATE TABLE reservas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario TEXT NOT NULL,
  sabor_id INTEGER,
  cantidad INTEGER NOT NULL,
  metodo_pago TEXT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sabor_id) REFERENCES sabores(id) ON DELETE CASCADE
);

-- Tabla de historial de ventas
DROP TABLE IF EXISTS historial_ventas;
CREATE TABLE historial_ventas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sabor_id INTEGER,
  cantidad INTEGER NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sabor_id) REFERENCES sabores(id) ON DELETE CASCADE
);

-- Insertar algunos sabores iniciales
INSERT INTO sabores (nombre, activo) VALUES ('Oreo', 1);
INSERT INTO sabores (nombre, activo) VALUES ('Fresas Piña', 1);
INSERT INTO sabores (nombre, activo) VALUES ('Pay de Fresas', 1);

-- Insertar inventario inicial
INSERT INTO inventario (sabor_id, cantidad) VALUES (1, 50);
INSERT INTO inventario (sabor_id, cantidad) VALUES (2, 30);
INSERT INTO inventario (sabor_id, cantidad) VALUES (3, 40);