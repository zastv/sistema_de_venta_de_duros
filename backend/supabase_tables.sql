-- Tabla de sabores
drop table if exists sabores cascade;
create table sabores (
  id serial primary key,
  nombre text not null,
  activo boolean default true
);

-- Habilitar RLS y crear políticas para sabores
alter table sabores enable row level security;
create policy "Allow all operations on sabores" on sabores for all using (true);

-- Tabla de inventario
drop table if exists inventario cascade;
create table inventario (
  id serial primary key,
  sabor_id integer references sabores(id) on delete cascade,
  cantidad integer not null,
  fecha date not null default current_date
);

-- Habilitar RLS y crear políticas para inventario
alter table inventario enable row level security;
create policy "Allow all operations on inventario" on inventario for all using (true);

-- Tabla de reservas
drop table if exists reservas cascade;
create table reservas (
  id serial primary key,
  usuario text not null,
  sabor_id integer references sabores(id) on delete cascade,
  cantidad integer not null,
  metodo_pago text not null, -- efectivo, transferencia, yappy
  fecha timestamp not null default now()
);

-- Habilitar RLS y crear políticas para reservas
alter table reservas enable row level security;
create policy "Allow all operations on reservas" on reservas for all using (true);

-- Tabla de historial de ventas
drop table if exists historial_ventas cascade;
create table historial_ventas (
  id serial primary key,
  sabor_id integer references sabores(id) on delete cascade,
  cantidad integer not null,
  fecha timestamp not null default now()
);

-- Habilitar RLS y crear políticas para historial_ventas
alter table historial_ventas enable row level security;
create policy "Allow all operations on historial_ventas" on historial_ventas for all using (true);

-- Insertar algunos sabores de ejemplo
insert into sabores (nombre) values 
  ('Chocolate'),
  ('Vainilla'),
  ('Fresa'),
  ('Coco'),
  ('Nuez');

-- Insertar inventario inicial
insert into inventario (sabor_id, cantidad) values 
  (1, 20),
  (2, 15),
  (3, 25),
  (4, 10),
  (5, 18);
