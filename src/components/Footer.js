import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "@themesberg/react-bootstrap";

export default (props) => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © {`${currentYear} `}
              <Card.Link
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              ></Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}></Col>
        </Row>
      </footer>
    </div>
  );
};
