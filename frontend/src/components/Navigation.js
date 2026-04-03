import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar estado inicial
    const checkLoginStatus = () => {
      const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      setIsAdminLoggedIn(adminLoggedIn);
    };

    checkLoginStatus();

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar un evento personalizado para actualizaciones inmediatas
    window.addEventListener('adminLoginChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminLoginChange', handleStorageChange);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">
            ✨ MarioDelights
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reservar">
              <Nav.Link>Reservar</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin">
              <Nav.Link className="d-flex align-items-center gap-1">
                Admin
                {location.pathname === '/admin' && isAdminLoggedIn && (
                  <Badge bg="success" className="small">Activo</Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {isAdminLoggedIn && (
              <LinkContainer to="/historial">
                <Nav.Link className="d-flex align-items-center gap-1">
                  Historial
                  {location.pathname === '/historial' && (
                    <Badge bg="info" className="small">Admin</Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
