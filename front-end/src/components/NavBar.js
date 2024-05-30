import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state/state";

const NavBar = () => {
  const isAuth = useSelector((state) => Boolean(state.token));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const styles = {
    navbar: {
      backgroundColor: "#1c8ef9",
    },
    brand: {
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <Navbar expand="lg" fixed="top" style={styles.navbar}>
      <Container>
        <Navbar.Brand onClick={() => navigate("/home")} style={styles.brand}>
          SocialApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" />
          {isAuth && <Button onClick={handleLogout}>Log out</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
