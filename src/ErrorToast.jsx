import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import "./App.css";

function ErrorToast({ showErrorToast, setShowErrorToast }) {
  console.log("🚀 ~ ErrorToast ~ showErrorToast:", showErrorToast);
  return (
    <Row className="">
      <Col xs={6} className="p-100">
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={5000}
          //   autohide
          className="w-100 border border-danger"
        >
          <Toast.Header className="bg-dark border border-danger">
            <strong className="me-auto text-danger fw-bold">Error!</strong>
          </Toast.Header>
          <Toast.Body className="bg-dark border border-danger">
            <h5 className="text-danger fw-bold">Something went Wrong!</h5>
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ErrorToast;
