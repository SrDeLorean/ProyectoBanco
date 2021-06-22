import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  Row,
  Col,
  Nav,
  Form,
  Image,
  Badge,
  Navbar,
  Dropdown,
  Container,
  ListGroup,
  InputGroup,
  Button,
} from "@themesberg/react-bootstrap";

import { startLogout } from "../actions/auth";

import { Routes } from "../constants/routes";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default (props = {}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const { rol } = props;

  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const location = useLocation();
  const { pathname } = location;

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };


  return (

    <Navbar variant="dark" collapseOnSelect expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary">
      <Container className="position-relative">
        <Navbar.Brand href={Routes.Clientes.path} className="me-lg-3">
        <FontAwesomeIcon icon={faPiggyBank} className="me-2" /> Proyecto Banco
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {rol == "admin" ? (
            <Nav className="navbar-nav-hover align-items-center">
              <Nav.Link href={Routes.Clientes.path}>Administrar Clientes</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="navbar-nav-hover align-items-center">
              <NavItem link={Routes.Inicio.path}>Inicio</NavItem>
              <NavItem link={Routes.Balance.path}>Balances</NavItem>
              <Nav.Link link={Routes.TransferenciaInterna.path}>Transferencias</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>

      </Container>
    </Navbar>
    // <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
    //   <Container fluid className="px-0">
    //     <div className="d-flex justify-content-between w-100">
    //       <div className="d-flex align-items-center">
    //         <Form className="navbar-search">
    //           <Form.Group id="topbarSearch">
    //             <InputGroup className="input-group-merge search-bar">
    //               {/*<InputGroup.Text>
    //                 <FontAwesomeIcon icon={faSearch} />
    //               </InputGroup.Text>
    //               <Form.Control type="text" placeholder="Search" />*/}
    //             </InputGroup>
    //           </Form.Group>
    //         </Form>
    //       </div>
    //       <Nav className="align-items-center">
            // <Dropdown as={Nav.Item}>
            //   <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
            //     <div className="media d-flex align-items-center">
            //       <Button variant="light">
            //         <FontAwesomeIcon icon={faCog} color="#123454" />

            //         <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
            //           <span className="mb-0 font-small fw-bold">Options</span>
            //         </div>
            //       </Button>
            //     </div>
            //   </Dropdown.Toggle>
            //   <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
            //     <Dropdown.Item className="fw-bold" onClick={handleLogout}>
            //       <FontAwesomeIcon
            //         icon={faSignOutAlt}
            //         className="text-danger me-2"
            //       />{" "}
            //       Logout
            //     </Dropdown.Item>
            //   </Dropdown.Menu>
            // </Dropdown>
    //       </Nav>
    //     </div>
    //   </Container>
    // </Navbar>
  );
};
