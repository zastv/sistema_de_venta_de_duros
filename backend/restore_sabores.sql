-- Restaurar la tabla sabores si fue eliminada.
-- Ejecuta este script en el SQL Editor de Supabase o en tu base de datos PostgreSQL.

DROP TABLE IF EXISTS sabores CASCADE;

CREATE TABLE sabores (
  id serial PRIMARY KEY,
  nombre text NOT NULL,
  activo boolean DEFAULT true
);

-- Habilitar RLS y política básica para acceso público en Supabase
ALTER TABLE sabores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on sabores" ON sabores
  FOR ALL
  USING (true);

-- Datos iniciales de sabores
INSERT INTO sabores (nombre) VALUES
  ('Chocolate'),
  ('Vainilla'),
  ('Fresa'),
  ('Coco'),
  ('Nuez');
