import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import placeholder from "../assets/img/Publicacion/user.png";

export default function NumeratedCard({ header, title, body, headerColor }) {
  return (
    <Card style={{ height: "300px" }} border="primary">
      <Card.Img
        src={placeholder}
        height="100px"
        style={{ paddingTop: "1em" }}
      />
      <Card.Body>
        <Card.Title className="textBlackBold">{title}</Card.Title>
        <Card.Text className="textJustify">{body}</Card.Text>
      </Card.Body>
    </Card>
  );
}
