import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, ListGroup } from 'react-bootstrap';
import { supabase } from '../supabaseClient';
import InformacionPago from '../components/InformacionPago';
import { calcularTotal, formatearPrecio } from '../utils/config';

export default function Reservar() {
  const [sabores, setSabores] = useState([]);
  const [inventario, setInventario] = useState({});
  const [formData, setFormData] = useState({
    usuario: '',
    sabor_id: '',
    cantidad: 1,
    metodo_pago: 'efectivo'
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const [cargandoSabores, setCargandoSabores] = useState(true);
  const [errorSabores, setErrorSabores] = useState('');

  const selectedSabor = sabores.find((sabor) => sabor.id === parseInt(formData.sabor_id, 10))?.nombre || '';

  useEffect(() => {
    cargarSaboresEInventario();
  }, []);

  const cargarSaboresEInventario = async () => {
    setCargandoSabores(true);
    setErrorSabores('');

    try {
      const { data: saboresData, error: saboresError } = await supabase
        .from('sabores')
        .select('*')
        .eq('activo', true)
        .order('nombre');

      if (saboresError) throw saboresError;
      const saboresList = saboresData || [];
      setSabores(saboresList);

      // Cargar inventario para cada sabor
      const inventarioPromises = saboresList.map(async (sabor) => {
        const { data, error } = await supabase
          .from('inventario')
          .select('cantidad')
          .eq('sabor_id', sabor.id)
          .order('fecha', { ascending: false })
          .limit(1);

        if (error) throw error;
        return { [sabor.id]: data[0]?.cantidad || 0 };
      });

      const inventarioResults = await Promise.all(inventarioPromises);
      const inventarioMap = inventarioResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setInventario(inventarioMap);
    } catch (error) {
      console.error('Error cargando datos:', error);
      setErrorSabores('No se pudieron cargar los sabores. Verifica la conexión o activa los sabores disponibles.');
      setSabores([]);
      setInventario({});
    } finally {
      setCargandoSabores(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const realizarReserva = async (e) => {
    e.preventDefault();
    
    if (!formData.usuario.trim() || !formData.sabor_id) {
      setMensaje('Por favor completa todos los campos');
      setTipoMensaje('danger');
      return;
    }

    const cantidadDisponible = inventario[formData.sabor_id] || 0;
    if (formData.cantidad > cantidadDisponible) {
      setMensaje(`Solo hay ${cantidadDisponible} duros disponibles de este sabor`);
      setTipoMensaje('warning');
      return;
    }

    setLoading(true);
    try {
      // Crear reserva
      const { error: reservaError } = await supabase
        .from('reservas')
        .insert([formData]);

      if (reservaError) throw reservaError;

      // Agregar a historial de ventas
      const { error: historialError } = await supabase
        .from('historial_ventas')
        .insert([{
          sabor_id: formData.sabor_id,
          cantidad: formData.cantidad
        }]);

      if (historialError) throw historialError;

      // Actualizar inventario
      const nuevaCantidad = cantidadDisponible - formData.cantidad;
      const { error: inventarioError } = await supabase
        .from('inventario')
        .upsert([{
          sabor_id: formData.sabor_id,
          cantidad: nuevaCantidad,
          fecha: new Date().toISOString().split('T')[0]
        }]);

      if (inventarioError) throw inventarioError;

      setMensaje('¡Reserva realizada exitosamente!');
      setTipoMensaje('success');
      setFormData({
        usuario: '',
        sabor_id: '',
        cantidad: 1,
        metodo_pago: 'efectivo'
      });
      cargarSaboresEInventario();
    } catch (error) {
      console.error('Error realizando reserva:', error);
      setMensaje('Error al realizar la reserva');
      setTipoMensaje('danger');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-success">🛒 Reservar en MarioDelights</h2>
                  <p className="text-muted">Selecciona tu sabor favorito y método de pago</p>
                </div>

                {mensaje && (
                  <Alert variant={tipoMensaje} className="text-center">
                    {mensaje}
                  </Alert>
                )}

                {errorSabores && (
                  <Alert variant="warning" className="text-center">
                    {errorSabores}
                  </Alert>
                )}

                <Form onSubmit={realizarReserva}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Sabor</Form.Label>
                    <Form.Select
                      name="sabor_id"
                      value={formData.sabor_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona un sabor</option>
                      {cargandoSabores && (
                        <option value="" disabled>
                          Cargando sabores...
                        </option>
                      )}
                      {!cargandoSabores && sabores.length === 0 && (
                        <option value="" disabled>
                          No hay sabores disponibles
                        </option>
                      )}
                      {sabores.map((sabor) => (
                        <option key={sabor.id} value={sabor.id}>
                          {sabor.nombre} ({inventario[sabor.id] || 0} disponibles)
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      min="1"
                      max={inventario[formData.sabor_id] || 1}
                      required
                    />
                    {formData.cantidad > 0 && (
                      <Form.Text className="text-muted">
                        Total a pagar: <strong>{formatearPrecio(calcularTotal(formData.cantidad))}</strong>
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Método de Pago</Form.Label>
                    <div className="d-flex gap-3">
                      <Form.Check
                        type="radio"
                        id="efectivo"
                        name="metodo_pago"
                        value="efectivo"
                        label="💵 Efectivo"
                        checked={formData.metodo_pago === 'efectivo'}
                        onChange={handleInputChange}
                      />
                      <Form.Check
                        type="radio"
                        id="transferencia"
                        name="metodo_pago"
                        value="transferencia"
                        label="🏦 Transferencia"
                        checked={formData.metodo_pago === 'transferencia'}
                        onChange={handleInputChange}
                      />
                      <Form.Check
                        type="radio"
                        id="yappy"
                        name="metodo_pago"
                        value="yappy"
                        label="📱 Yappy"
                        checked={formData.metodo_pago === 'yappy'}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : '¡Reservar Ahora!'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Información de pago */}
            <InformacionPago 
              metodoPago={formData.metodo_pago} 
              total={parseInt(formData.cantidad) || 0}
              sabor={selectedSabor}
            />
          </Col>

          <Col md={4}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Card.Title className="h5 fw-bold text-info mb-3">
                  📦 Disponibilidad
                </Card.Title>
                <ListGroup variant="flush">
                  {sabores.map((sabor) => (
                    <ListGroup.Item key={sabor.id} className="d-flex justify-content-between align-items-center">
                      <span>{sabor.nombre}</span>
                      <Badge bg={inventario[sabor.id] > 0 ? 'success' : 'danger'}>
                        {inventario[sabor.id] || 0}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            {formData.metodo_pago === 'efectivo' && (
              <Card className="shadow-lg border-0 mt-3">
                <Card.Body>
                  <Card.Title className="h5 fw-bold text-success mb-3">
                    💵 Pago en Efectivo
                  </Card.Title>
                  <Alert variant="success">
                    <strong>¡Perfecto!</strong><br/>
                    Puedes pagar en efectivo al momento de recoger tu pedido.
                    <hr/>
                    <strong>Total a pagar:</strong> {formatearPrecio(calcularTotal(parseInt(formData.cantidad) || 0))}
                  </Alert>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
