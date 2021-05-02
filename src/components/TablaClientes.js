import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Table,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Routes } from "../constants/routes";

const datos = [
  {
    Id: 1,
    nombre: "Juan García",
    rut: "1234-5",
    status: "Inactivo",
  },
  {
    Id: 2,
    nombre: "Nicolas García",
    rut: "1234-5",
    status: "Activo",
  },
  {
    Id: 3,
    nombre: "Christian García",
    rut: "1234-5",
    status: "Activo",
  },
  {
    Id: 4,
    nombre: "Julio García",
    rut: "1234-5",
    status: "Activo",
  },
];
export const TablaClientes = () => {
  const TableRow = (props) => {
    const { Id, nombre, rut, status } = props;
    const statusVariant =
      status === "Activo"
        ? "success"
        : status === "Inactivo"
        ? "danger"
        : "primary";

    return (
      <tr>
        <td>{Id}</td>
        <td>
          <span className="fw-normal">{nombre}</span>
        </td>
        <td>
          <span className="fw-normal">{rut}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={Routes.EditarCliente.path}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                Deshabilitar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Nombre Completo</th>
              <th className="border-bottom">Rut</th>
              <th className="border-bottom">Estado</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((t) => (
              <TableRow key={`transaction-${t.Id}`} {...t} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
