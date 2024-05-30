import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import PostInput from "components/PostInput";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/state";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);
  const myUserId = useSelector((state) => state.user._id);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/posts/${userId}/posts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
          }
        );
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

    if (token && userId) {
      fetchPosts();
    }
  });

  const styles = {
    contentCol: {
      marginTop: "5rem",
    },
  };

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col md={3} style={{ paddingRight: "0" }}>
            <SideBar />
          </Col>
          <Col md={9} style={styles.contentCol}>
            {loading ? (
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {myUserId === userId && <PostInput />}
                <Feed />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
