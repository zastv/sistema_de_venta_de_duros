import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { PRECIO_POR_DURO, formatearPrecio } from './utils/config';

export default function Home() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        <div className="text-center mb-5 text-white">
          <h1 className="display-3 fw-bold mb-3">✨ Hugo's Delights</h1>
          <p className="lead fs-4">Reserva tus duros favoritos y disfruta de nuestras delicias artesanales</p>
          <Badge bg="light" text="dark" className="fs-5 p-3 mt-2">
            Precio por duro: {formatearPrecio(PRECIO_POR_DURO)}
          </Badge>
        </div>
        <Row className="justify-content-center g-4">
          <Col md={8} lg={6}>
            <Card className="h-100 shadow-lg border-0" style={{ transform: 'translateY(0)', transition: 'transform 0.3s' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🍮</div>
                <Card.Title className="h4 fw-bold text-success">Reservar Duros</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Haz tu reserva en Hugo's Delights de forma rápida y sencilla.
                </Card.Text>
                <Button as={Link} to="/reservar" variant="success" size="lg" className="px-4">
                  Reservar Ahora
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
