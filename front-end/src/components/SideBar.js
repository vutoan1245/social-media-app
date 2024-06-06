import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeIcon, ProfileIcon } from "assets/icons";

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
      className="col-md-12 d-none d-md-block sidebar mb-6 bg-white rounded-lg shadow-md"
      fixed="left"
      style={styles.sidebar}
    >
      <div className="sidebar-sticky">
        <Nav.Item>
          <Nav.Link
            style={{ display: "flex" }}
            onClick={() => navigate("/home")}
          >
            <HomeIcon />
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={{ display: "flex" }}
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <ProfileIcon />
            My Profile
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideBar;
