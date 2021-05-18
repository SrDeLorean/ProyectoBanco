import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Table,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";

const datos = [
  {
    Id: 1,
    nombre: "Juan García",
    rut: "1234-5",
    status: "Inactivo",
  },
];
export const TablaClientes = (props) => {
  console.log(props)
  const TableRow = (props) => {
    const { id, nombre, email } = props;
    return (
      <tr>
        <td>
          <span className="fw-normal">{nombre}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
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
              <Dropdown.Item href={`/Editar-cliente/${id}`}>
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
        {!props.usuarios ? (
          <div>cargando...</div>
        ) : (
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Nombre Completo</th>
                <th className="border-bottom">Email</th>
              </tr>
            </thead>
            <tbody>
              {props.usuarios.map((t) => (
                <TableRow key={`transaction-${t.id}`} {...t} />
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
