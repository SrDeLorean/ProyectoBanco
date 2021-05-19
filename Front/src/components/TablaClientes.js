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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { deleteUser } from "../actions/usuarios";

export const TablaClientes = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(props);

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
              <Dropdown.Item
                onClick={() => {
                  history.push("Editar-cliente/" + id);
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={async () => {
                  dispatch(deleteUser(id));
                }}
              >
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
