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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={{ display: "flex" }}
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            My Profile
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideBar;
