import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  const styles = {
    sidebar: {
      marginTop: "5rem",
      backgroundColor: "white",
      border: "1px solid #ced4da",
      borderRadius: "0.25rem",
    },
  };

  return (
    <Nav
      className="col-md-12 d-none d-md-block sidebar"
      fixed="left"
      style={styles.sidebar}
    >
      <div className="sidebar-sticky">
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate(`/profile/${userId}`)}>
            My Profile
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideBar;
