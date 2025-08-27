import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Table, Alert, Badge, Form, ButtonGroup, Button } from 'react-bootstrap';
import { supabase } from '../supabaseClient';
import LoginAdmin from '../components/LoginAdmin';

export default function Historial() {
  const [reservas, setReservas] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [vistaActual, setVistaActual] = useState('reservas');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cargarReservas = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('reservas')
        .select(`
          *,
          sabores(nombre, activo)
        `)
        .order('fecha', { ascending: false });

      if (filtroFecha) {
        query = query.gte('fecha', filtroFecha + 'T00:00:00')
                     .lte('fecha', filtroFecha + 'T23:59:59');
      }

      const { data, error } = await query;
      if (error) throw error;
      setReservas(data || []);
    } catch (error) {
      console.error('Error cargando reservas:', error);
    }
    setLoading(false);
  }, [filtroFecha]);

  const cargarVentas = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('historial_ventas')
        .select(`
          *,
          sabores(nombre, activo)
        `)
        .order('fecha', { ascending: false });

      if (filtroFecha) {
        query = query.gte('fecha', filtroFecha + 'T00:00:00')
                     .lte('fecha', filtroFecha + 'T23:59:59');
      }

      const { data, error } = await query;
      if (error) throw error;
      setVentas(data || []);
    } catch (error) {
      console.error('Error cargando ventas:', error);
    }
    setLoading(false);
  }, [filtroFecha]);

  useEffect(() => {
    // Verificar si ya está logueado como admin
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (vistaActual === 'reservas') {
        cargarReservas();
      } else {
        cargarVentas();
      }
    }
  }, [vistaActual, cargarReservas, cargarVentas, isLoggedIn]);

  // Si no está logueado, mostrar el login
  if (!isLoggedIn) {
    return <LoginAdmin onLogin={setIsLoggedIn} />;
  }

  const obtenerBadgeMetodoPago = (metodo) => {
    const colores = {
      'efectivo': 'success',
      'transferencia': 'primary',
      'yappy': 'warning'
    };
    return <Badge bg={colores[metodo] || 'secondary'}>{metodo}</Badge>;
  };

  const calcularTotalVentas = () => {
    const datos = vistaActual === 'reservas' ? reservas : ventas;
    return datos.reduce((total, item) => total + item.cantidad, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    // Disparar evento personalizado para actualizar la navegación
    window.dispatchEvent(new CustomEvent('adminLoginChange'));
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container>
        <div className="text-center mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div></div>
            <div>
              <h2 className="fw-bold text-dark mb-0">📊 Historial de Ventas - Hugo's Delights</h2>
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
              className="d-flex align-items-center gap-1"
            >
              🚪 Cerrar Sesión
            </Button>
          </div>
          <p className="text-muted">Consulta el historial completo de reservas y ventas</p>
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <ButtonGroup className="w-100">
              <Button
                variant={vistaActual === 'reservas' ? 'primary' : 'outline-primary'}
                onClick={() => setVistaActual('reservas')}
              >
                📋 Reservas
              </Button>
              <Button
                variant={vistaActual === 'ventas' ? 'primary' : 'outline-primary'}
                onClick={() => setVistaActual('ventas')}
              >
                💰 Ventas
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={6}>
            <Form.Control
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              placeholder="Filtrar por fecha"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Card.Title className="h5 fw-bold mb-0">
                    {vistaActual === 'reservas' ? '📋 Reservas' : '💰 Historial de Ventas'}
                  </Card.Title>
                  <Badge bg="info" className="fs-6 p-2">
                    Total: {calcularTotalVentas()} duros
                  </Badge>
                </div>

                {loading ? (
                  <Alert variant="info">Cargando datos...</Alert>
                ) : (
                  <>
                    {vistaActual === 'reservas' && reservas.length > 0 && (
                      <Table responsive striped hover>
                        <thead className="table-dark">
                          <tr>
                            <th>Usuario</th>
                            <th>Sabor</th>
                            <th>Cantidad</th>
                            <th>Método de Pago</th>
                            <th>Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservas.map((reserva) => (
                            <tr key={reserva.id}>
                              <td className="fw-bold">{reserva.usuario}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {reserva.sabores?.nombre}
                                  {!reserva.sabores?.activo && (
                                    <Badge bg="secondary" className="small">Inactivo</Badge>
                                  )}
                                </div>
                              </td>
                              <td>
                                <Badge bg="secondary">{reserva.cantidad}</Badge>
                              </td>
                              <td>{obtenerBadgeMetodoPago(reserva.metodo_pago)}</td>
                              <td>{new Date(reserva.fecha).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}

                    {vistaActual === 'ventas' && ventas.length > 0 && (
                      <Table responsive striped hover>
                        <thead className="table-dark">
                          <tr>
                            <th>Sabor</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ventas.map((venta) => (
                            <tr key={venta.id}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <span className="fw-bold">{venta.sabores?.nombre}</span>
                                  {!venta.sabores?.activo && (
                                    <Badge bg="secondary" className="small">Inactivo</Badge>
                                  )}
                                </div>
                              </td>
                              <td>
                                <Badge bg="success">{venta.cantidad}</Badge>
                              </td>
                              <td>{new Date(venta.fecha).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}

                    {((vistaActual === 'reservas' && reservas.length === 0) || 
                      (vistaActual === 'ventas' && ventas.length === 0)) && (
                      <Alert variant="info" className="text-center">
                        No hay {vistaActual} registradas
                        {filtroFecha && ' para la fecha seleccionada'}
                      </Alert>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
