import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/state";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";

const EmailField = ({ email, setEmail }) => (
  <Form.Group className="mb-3" controlId="formEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  </Form.Group>
);

const PasswordField = ({ password, setPassword }) => (
  <Form.Group className="mb-3" controlId="formPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
  </Form.Group>
);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const loggedInRes = await res.json();

      if (loggedInRes) {
        dispatch(
          setLogin({
            user: loggedInRes.user,
            token: loggedInRes.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      setError("Invalid email or password");
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
            <h3>Sign In</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <EmailField email={email} setEmail={setEmail} />
            <PasswordField password={password} setPassword={setPassword} />

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </div>

            <p className="forgot-password text-right">
              Register a new account <Link to="/sign-up">Sign up?</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
