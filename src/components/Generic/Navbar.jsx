import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = ({ isAdmin, onLogout }) => {
  const user = localStorage.getItem("nombre");
  return (
    <Navbar bg="secondary" variant="dark" expand="lg">
      <div className="vw-100">
        <LinkContainer to="/">
          <Navbar.Brand>Reserva de Espacios</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-evenly">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reservar">
              <Nav.Link>Nueva Reserva</Nav.Link>
            </LinkContainer>
            {/* Esto nos permite renderizar un componente solo cuando tengamos el rol de administrador
            Este rol lo recibimos en otro componente padre llamado App.jsx */}
            {isAdmin && (
              <LinkContainer to="/admin">
                <Nav.Link>Administración</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          <Nav>
            <Navbar.Text className="me-3">
              Hola, {user}
            </Navbar.Text>
            <Button variant="outline-light" size="sm" onClick={onLogout}>
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
