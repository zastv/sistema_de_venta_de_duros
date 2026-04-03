import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { PRECIO_POR_DURO, formatearPrecio } from './utils/config';

export default function Home() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', overflow: 'hidden' }}>
      <Container className="py-5">
        <div className="text-center mb-5 text-white animate-fade-in">
          <h1 className="display-3 fw-bold mb-3 animate-slide-up">✨ Hugo's Delights</h1>
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
                  Haz tu reserva en Hugo's Delights de forma rápida y sencilla.
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
            <h2 className="animate-fade-in-delay">Nuestros Productos</h2>
            <p className="lead">Descubre la variedad de duros artesanales.</p>
          </Col>
        </Row>
        <Row className="mt-4 g-4">
          <Col md={3}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍫</div>
                <Card.Title>Chocolate</Card.Title>
                <Card.Text>Delicioso y cremoso.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍓</div>
                <Card.Title>Fresa</Card.Title>
                <Card.Text>Fresco y afrutado.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🥥</div>
                <Card.Title>Coco</Card.Title>
                <Card.Text>Exótico y tropical.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm border-0 product-card">
              <Card.Body>
                <div style={{ fontSize: '3rem' }}>🍯</div>
                <Card.Title>Miel</Card.Title>
                <Card.Text>Dulce y natural.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 text-center text-white">
          <Col>
            <h2 className="animate-fade-in-delay">Testimonios</h2>
            <p className="lead">Lo que dicen nuestros clientes.</p>
          </Col>
        </Row>
        <Row className="mt-4 g-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 testimonial-card">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>⭐⭐⭐⭐⭐</div>
                <Card.Text>"¡Los mejores duros que he probado!"</Card.Text>
                <Card.Footer className="text-muted">- Cliente Satisfecho</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 testimonial-card">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>⭐⭐⭐⭐⭐</div>
                <Card.Text>"Servicio rápido y delicioso."</Card.Text>
                <Card.Footer className="text-muted">- Ana G.</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 testimonial-card">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>⭐⭐⭐⭐⭐</div>
                <Card.Text>"Volveré por más."</Card.Text>
                <Card.Footer className="text-muted">- Carlos M.</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <footer className="mt-5 text-center text-white">
          <p>&copy; 2026 Hugo's Delights. Todos los derechos reservados.</p>
        </footer>
      </Container>
    </div>
  );
}
