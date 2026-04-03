import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { PRECIO_POR_DURO, formatearPrecio } from './utils/config';

export default function Home() {
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!mensaje.trim()) {
      return;
    }
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setMensaje('');
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', overflow: 'hidden' }}>
      <Container className="py-5">
        <div className="text-center mb-5 text-white animate-fade-in">
          <h1 className="display-3 fw-bold mb-3 animate-slide-up">✨ MarioDelights</h1>
          <p className="lead fs-4 animate-slide-up-delay">Reserva tus duros favoritos y disfruta de nuestras delicias artesanales</p>
          <Badge bg="light" text="dark" className="fs-5 p-3 mt-2 animate-bounce">
            Precio por duro: {formatearPrecio(PRECIO_POR_DURO)}
          </Badge>
        </div>
        <Row className="justify-content-center g-4">
          <Col md={8} lg={6}>
            <Card className="h-100 shadow-lg border-0 card-hover animate-card" style={{ transform: 'translateY(0)', transition: 'transform 0.3s, box-shadow 0.3s' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3 animate-emoji" style={{ fontSize: '3rem' }}>🍮</div>
                <Card.Title className="h4 fw-bold text-success">Reservar Duros</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Haz tu reserva en MarioDelights de forma rápida y sencilla.
                </Card.Text>
                <Button as={Link} to="/reservar" variant="success" size="lg" className="px-4 btn-hover">
                  Reservar Ahora
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 text-center text-white">
          <Col>
            <h2 className="animate-fade-in-delay">¿Por qué elegirnos?</h2>
            <p className="lead">Innovación, calidad y sabor en cada bocado.</p>
          </Col>
        </Row>
        <Row className="mt-4 g-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 feature-card">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>🚀</div>
                <Card.Title>Rápido</Card.Title>
                <Card.Text>Reserva en segundos.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 feature-card">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>🍴</div>
                <Card.Title>Delicioso</Card.Title>
                <Card.Text>Sabor artesanal.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 feature-card">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>💚</div>
                <Card.Title>Ecológico</Card.Title>
                <Card.Text>Ingredientes naturales.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 text-center text-white">
          <Col>
            <h2 className="animate-fade-in-delay">Sabores destacados</h2>
            <p className="lead">Elige entre nuestros sabores únicos de duros.</p>
          </Col>
        </Row>
        <Row className="mt-4 g-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍪</div>
                <Card.Title>Oreo</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍓🍍</div>
                <Card.Title>Fresas Piña</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍓🥧</div>
                <Card.Title>Pay de Fresas</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍋🥧</div>
                <Card.Title>Pay de Limón</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🥥</div>
                <Card.Title>Coco</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🥭</div>
                <Card.Title>Pay de Maracuyá</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍬</div>
                <Card.Title>Chicle</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🫐</div>
                <Card.Title>Zarzamora</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🌹</div>
                <Card.Title>Rosa</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍬</div>
                <Card.Title>Malva Kola</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍇</div>
                <Card.Title>Malva Mora</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 text-center text-white">
          <Col>
            <h2 className="animate-fade-in-delay">Escribe tu pedido o sugerencia</h2>
            <p className="lead">Cuéntanos qué sabor quieres o deja tu comentario.</p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className="shadow-sm border-0 message-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="customerMessage">
                    <Form.Label className="fw-bold">Tu mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Escribe aquí lo que te gustaría pedir o cualquier sugerencia..."
                      value={mensaje}
                      onChange={(event) => setMensaje(event.target.value)}
                      className="message-box"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-3">
                    <Button type="submit" variant="light" className="submit-msg-btn">
                      Enviar mensaje
                    </Button>
                    {enviado && <span className="text-success mt-2 mt-md-0">¡Mensaje recibido! Gracias.</span>}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <footer className="mt-5 text-center text-white">
          <p>&copy; 2026 MarioDelights. Todos los derechos reservados.</p>
        </footer>
      </Container>
    </div>
  );
}
