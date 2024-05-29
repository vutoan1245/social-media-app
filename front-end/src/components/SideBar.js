import { Nav } from "react-bootstrap";

const SideBar = () => {
  return (
    <Nav
      className="col-md-12 d-none d-md-block sidebar"
      fixed="left"
      style={{ marginTop: "5rem", backgroundColor: "white" }}
    >
      <div className="sidebar-sticky">
        <Nav.Item>
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#messages">Messages</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#settings">Settings</Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideBar;
