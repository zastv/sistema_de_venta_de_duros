import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Badge } from 'react-bootstrap';
import { supabase, verificarConexion } from '../supabaseClient';
import LoginAdmin from '../components/LoginAdmin';

export default function Admin() {
  const [sabores, setSabores] = useState([]);
  const [nuevoSabor, setNuevoSabor] = useState('');
  const [inventario, setInventario] = useState({});
  const [ventasHoy, setVentasHoy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [conexionOk, setConexionOk] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si ya está logueado
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const inicializar = async () => {
        const conexion = await verificarConexion();
        setConexionOk(conexion);
        if (conexion) {
          cargarSabores();
          cargarVentasHoy();
        }
      };
      inicializar();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    // Disparar evento personalizado para actualizar la navegación
    window.dispatchEvent(new CustomEvent('adminLoginChange'));
  };

  // Si no está logueado, mostrar formulario de login
  if (!isLoggedIn) {
    return <LoginAdmin onLogin={setIsLoggedIn} />;
  }

  const cargarSabores = async () => {
    try {
      const { data, error } = await supabase
        .from('sabores')
        .select('*')
        .order('nombre');
      
      if (error) throw error;
      setSabores(data || []);
    } catch (error) {
      console.error('Error cargando sabores:', error);
    }
  };

  const toggleSaborActivo = async (saborId, activo) => {
    try {
      const { error } = await supabase
        .from('sabores')
        .update({ activo: !activo })
        .eq('id', saborId);

      if (error) throw error;
      
      setMensaje(`Sabor ${!activo ? 'activado' : 'desactivado'} exitosamente`);
      cargarSabores();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error actualizando sabor:', error);
      setMensaje('Error al actualizar el sabor');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const cargarVentasHoy = async () => {
    try {
      const hoy = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('historial_ventas')
        .select(`
          *,
          sabores(nombre)
        `)
        .gte('fecha', hoy + 'T00:00:00')
        .lte('fecha', hoy + 'T23:59:59');
      
      if (error) throw error;
      setVentasHoy(data || []);
    } catch (error) {
      console.error('Error cargando ventas de hoy:', error);
    }
  };

  const agregarSabor = async (e) => {
    e.preventDefault();
    if (!nuevoSabor.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('sabores')
        .insert([{ nombre: nuevoSabor }]);

      if (error) throw error;
      
      setNuevoSabor('');
      setMensaje('Sabor agregado exitosamente');
      cargarSabores();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error agregando sabor:', error);
    }
    setLoading(false);
  };

  const actualizarInventario = async (saborId, cantidad) => {
    try {
      const { error } = await supabase
        .from('inventario')
        .upsert([{ sabor_id: saborId, cantidad: parseInt(cantidad), fecha: new Date().toISOString().split('T')[0] }]);

      if (error) throw error;
      setMensaje('Inventario actualizado');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error actualizando inventario:', error);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-center">
            <h2 className="fw-bold text-white">👨‍💼 Panel de Administración - MarioDelights</h2>
            <p className="text-white-50">Gestiona sabores, inventario y consulta ventas</p>
          </div>
          <Button 
            variant="outline-light" 
            onClick={handleLogout}
            className="d-flex align-items-center gap-2"
          >
            🚪 Cerrar Sesión
          </Button>
        </div>

        {!conexionOk && (
          <Alert variant="danger" className="text-center">
            <strong>Error de conexión con la base de datos</strong><br/>
            Por favor verifica que el backend local (`http://localhost:3001`) esté levantado y ejecutándose.
          </Alert>
        )}

        {mensaje && (
          <Alert variant="success" className="text-center">
            {mensaje}
          </Alert>
        )}

        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body>
                <Card.Title className="h5 fw-bold text-primary mb-3">
                  🍰 Gestión de Sabores
                </Card.Title>
                <Form onSubmit={agregarSabor}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nuevo Sabor</Form.Label>
                    <Form.Control
                      type="text"
                      value={nuevoSabor}
                      onChange={(e) => setNuevoSabor(e.target.value)}
                      placeholder="Ej: Chocolate, Vainilla, Fresa..."
                      disabled={!conexionOk}
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loading || !conexionOk}
                    className="w-100"
                  >
                    {loading ? 'Agregando...' : 'Agregar Sabor'}
                  </Button>
                </Form>
                
                <div className="mt-4">
                  <h6 className="fw-bold">Sabores Registrados:</h6>
                  <div className="d-flex flex-column gap-2">
                    {sabores.map((sabor) => (
                      <div key={sabor.id} className="d-flex justify-content-between align-items-center p-2 border rounded">
                        <div className="d-flex align-items-center gap-2">
                          <Badge bg={sabor.activo ? 'success' : 'secondary'} className="p-2">
                            {sabor.nombre}
                          </Badge>
                          <small className="text-muted">
                            {sabor.activo ? 'Activo' : 'Inactivo'}
                          </small>
                        </div>
                        <Button
                          variant={sabor.activo ? 'outline-danger' : 'outline-success'}
                          size="sm"
                          onClick={() => toggleSaborActivo(sabor.id, sabor.activo)}
                          disabled={!conexionOk}
                        >
                          {sabor.activo ? '🔴 Desactivar' : '🟢 Activar'}
                        </Button>
                      </div>
                    ))}
                    {sabores.length === 0 && (
                      <Alert variant="info" className="mb-0">
                        No hay sabores registrados
                      </Alert>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body>
                <Card.Title className="h5 fw-bold text-success mb-3">
                  📦 Actualizar Inventario
                </Card.Title>
                {sabores.filter(sabor => sabor.activo).map((sabor) => (
                  <Form.Group key={sabor.id} className="mb-3">
                    <Form.Label>{sabor.nombre}</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Cantidad"
                        onChange={(e) => setInventario({...inventario, [sabor.id]: e.target.value})}
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => actualizarInventario(sabor.id, inventario[sabor.id])}
                        disabled={!inventario[sabor.id] || !conexionOk}
                      >
                        Actualizar
                      </Button>
                    </div>
                  </Form.Group>
                ))}
                {sabores.filter(sabor => sabor.activo).length === 0 && (
                  <Alert variant="warning" className="mb-0">
                    No hay sabores activos para gestionar inventario
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Card.Title className="h5 fw-bold text-info mb-3">
                  📈 Ventas de Hoy
                </Card.Title>
                {ventasHoy.length > 0 ? (
                  <Table responsive striped hover>
                    <thead>
                      <tr>
                        <th>Sabor</th>
                        <th>Cantidad</th>
                        <th>Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventasHoy.map((venta) => (
                        <tr key={venta.id}>
                          <td>{venta.sabores?.nombre}</td>
                          <td>{venta.cantidad}</td>
                          <td>{new Date(venta.fecha).toLocaleTimeString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Alert variant="info">No hay ventas registradas hoy</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
