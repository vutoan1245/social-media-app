import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state/state";

const NavBar = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#1c8ef9" }}>
      <Container>
        <Navbar.Brand onClick={() => navigate("/home")}>
          <p style={{ color: "white", margin: "auto" }}>SocialApp</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>

          {isAuth && <Button onClick={handleLogout}>Log out</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
