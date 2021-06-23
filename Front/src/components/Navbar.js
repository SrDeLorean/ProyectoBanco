import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Container } from "@themesberg/react-bootstrap";
import { startLogout } from "../actions/auth";
import { Routes } from "../constants/routes";
import { Link } from "react-router-dom";

export default (props = {}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const { rol } = props;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  return (
    //Barra superior de navegacion, que se mantiene a lo largo de la pagina
    <Navbar variant="dark" collapseOnSelect expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary">
      <Container className="position-relative">
        {/* Marca/Nombre de la pagina*/}
        {/* Nos lleva a la pagina de inicio, dependiendo del rol del usuario */}
        {rol == "admin" ? (
          <Navbar.Brand as={Link} to={Routes.Clientes.path} className="me-lg-3">
            <FontAwesomeIcon icon={faPiggyBank} className="me-2" /> Proyecto Banco
          </Navbar.Brand>    
        ): (
          <Navbar.Brand as={Link} to={Routes.Inicio.path} className="me-lg-3">
            <FontAwesomeIcon icon={faPiggyBank} className="me-2" /> Proyecto Banco
          </Navbar.Brand>    
        )}
        {/* En pantallas pequeñas, la barra lateral se contrae a un menu desplegable */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {/* En el caso del administrador la vista de inicio es la unica con la que puede interactuar*/}
          {/* En esta gestiona los distintos usuarios */}
          {/* En la barra superior solo tiene el boton para cerrar sesion */}
          {rol == "admin" ? (
            <Nav className="navbar-nav-hover align-items-center">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          ) : (
            //En el caso del Cliente, este puede ir a la vista de balances, tranferencias o cerrar sesion
            <Nav className="navbar-nav-hover align-items-center">              
              <Nav.Link as={Link} to={Routes.Balance.path}>Balances</Nav.Link>
              <Nav.Link as={Link} to={Routes.TransferenciaInterna.path}>Transferencias</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
