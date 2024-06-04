import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/state";
import PostInput from "components/PostInput";

const HomePage = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });
        const posts = await response.json();

        if (posts) {
          dispatch(setPosts({ posts }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token, dispatch]);

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col md={3} style={{ paddingRight: "0" }}>
            <SideBar />
          </Col>
          <Col
            md={9}
            style={{
              marginTop: "5rem",
              maxWidth: "1000px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                <PostInput />
                <Feed />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
