import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  return (
    <>

      {/* Heading Section */}

      <div className="text-center mt-5 mb-4">

        <h1 style={{ fontSize: "55px", fontWeight: "bold", color: "#198754" }}>
          STUDENT PORTAL
        </h1>

        <hr style={{ width: "60%", margin: "20px auto" }} />

        <p style={{ fontSize: "22px", color: "gray" }}>
          Manage Student Records Easily
        </p>

        <p style={{ fontSize: "18px", color: "#555" }}>
          Register • Update • View Student Details
        </p>

        <p style={{ fontSize: "18px", color: "#555" }}>
          A Simple and Secure MERN Stack Student Management System
        </p>

      </div>



      {/* Cards */}

      <Container className="mt-5 mb-5">

        <h2 className="text-center mb-4">
          Student Services
        </h2>


        <Row className="g-4">


          <Col md={4}>

            <Card className="shadow h-100">

              <Card.Body>

                <Card.Title>
                  📋 Student Registration
                </Card.Title>

                <Card.Text>
                  Register new students with complete details including
                  personal information, course, city, phone number and profile
                  image.
                </Card.Text>

                <Button variant="success">
                  Register
                </Button>

              </Card.Body>

            </Card>

          </Col>



          <Col md={4}>

            <Card className="shadow h-100">

              <Card.Body>

                <Card.Title>
                  👨‍🎓 Student Records
                </Card.Title>

                <Card.Text>
                  View all registered students, update their information,
                  search records and delete student details whenever required.
                </Card.Text>

                <Button variant="success">
                  View Records
                </Button>

              </Card.Body>

            </Card>

          </Col>



          <Col md={4}>

            <Card className="shadow h-100">

              <Card.Body>

                <Card.Title>
                  📧 Email Notification
                </Card.Title>

                <Card.Text>
                  Students receive an automatic registration confirmation
                  email after successful registration through the portal.
                </Card.Text>

                <Button variant="success">
                  Learn More
                </Button>

              </Card.Body>

            </Card>

          </Col>


        </Row>

      </Container>



      {/* Footer */}

      <footer className="footer">

        <div>

          <h4>
            Student Portal
          </h4>

          <p>
            A MERN Stack Student Management System for managing student
            information efficiently.
          </p>

        </div>



        <div>

          <h5>
            Quick Links
          </h5>

          <p>Home</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Students</p>

        </div>



        <div>

          <h5>
            Contact
          </h5>

          <p>📧 studentportal@gmail.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Coimbatore, Tamil Nadu</p>

        </div>


        <hr />


        <p className="text-center w-100">
          © 2026 Student Portal | All Rights Reserved
        </p>


      </footer>


    </>
  );
}

export default Home;