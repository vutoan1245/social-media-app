import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";

const FormField = ({
  controlId,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Form.Group>
);

const FileField = ({ controlId, label, onChange }) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control type="file" onChange={onChange} />
  </Form.Group>
);

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("picture", image);
    }

    try {
      const res = await fetch(`http://localhost:3001/auth/register`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      const data = await res.json();
      if (data) {
        navigate("/sign-in");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("SignUp error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="auth-inner"
      style={{ maxWidth: "400px", marginTop: "6rem" }}
    >
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={onSubmit}>
            <h3>Sign Up</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <FormField
              controlId="formFirstName"
              label="First name"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <FormField
              controlId="formLastName"
              label="Last name"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <FormField
              controlId="formEmail"
              label="Email address"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormField
              controlId="formPassword"
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FileField
              controlId="formImage"
              label="Profile Image"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="d-grid mb-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
              </Button>
            </div>

            <p className="forgot-password text-right">
              Already registered <Link to="/sign-in">Sign in?</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
