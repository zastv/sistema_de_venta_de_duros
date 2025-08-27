import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export default function LoginAdmin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Contraseña simple para demo - en producción usarías autenticación real
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular verificación
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin(true);
        localStorage.setItem('adminLoggedIn', 'true');
        // Disparar evento personalizado para actualizar la navegación
        window.dispatchEvent(new CustomEvent('adminLoginChange'));
      } else {
        setError('Contraseña incorrecta');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', minHeight: '100vh', paddingTop: '5rem' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-danger">🔐 Acceso Admin - Hugo's Delights</h2>
                  <p className="text-muted">Ingresa la contraseña de administrador</p>
                </div>

                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa la contraseña"
                      required
                      autoFocus
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="danger"
                    size="lg"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? 'Verificando...' : 'Acceder'}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Demo: La contraseña es "admin123"
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
