import { useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";

import Insertstudent from "../page/Insertstudent";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Navbar className="nav shadow-sm">
        <Container fluid>

          {/* Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center"
          >
            <img
              src="/Image/logo.jpg"
              alt="Logo"
              width="50"
              height="50"
              className="me-2"
            />

            <h3 className="m-0 fw-bold">
              Student Portal
            </h3>
          </Navbar.Brand>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-2">

            <Button
              variant="success"
              onClick={() => setShowModal(true)}
            >
              Insert
            </Button>

            <Link to="/students">
              <Button variant="success">
                View
              </Button>
            </Link>

            <Button
              variant="outline-dark"
              onClick={() => setShowMenu(true)}
            >
              ☰
            </Button>

          </div>

        </Container>
      </Navbar>

      {/* Offcanvas */}

      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>

          <Nav className="flex-column"  style={{ backgroundColor: "white" }}>

            <Nav.Link
              as={Link}
              to="/"
              onClick={() => setShowMenu(false)}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/About"
              onClick={() => setShowMenu(false)}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Contact"
              onClick={() => setShowMenu(false)}
            >
              Contact Us
            </Nav.Link>

          </Nav>

        </Offcanvas.Body>
      </Offcanvas>

      {/* Insert Modal */}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Student Registration
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Insertstudent
            handleClose={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;