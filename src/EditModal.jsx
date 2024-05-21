import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal({
  startEditing,
  showEditModal,
  saveEditing,
  editing,
  setEditing,
}) {
  const handleEditSubmit = (e) => {
    e.preventDefault();
    saveEditing();
    startEditing();
  };
  return (
    <>
      <Modal
        show={showEditModal}
        onHide={() => {
          startEditing();
        }}
      >
        <Modal.Header className="border-0 pb-0" closeButton>
          <Modal.Title className="text-dark">Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                value={editing.text}
                onChange={(e) =>
                  setEditing({ ...editing, text: e.target.value })
                }
                placeholder="Enter task"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={startEditing}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
