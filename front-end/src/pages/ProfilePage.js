import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import PostInput from "../components/PostInput";
import UserInfo from "../components/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/state";
import { useParams } from "react-router-dom";
import { fetchUserData } from "api/userApi";
import { fetchUserPosts } from "api/postsApi";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const token = useSelector((state) => state.token);
  const currUserId = useSelector((state) => state.user.id);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData(userId, token);
        if (userData) {
          setUserInfo(userData);
        }

        const posts = await fetchUserPosts(userId, token);
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
      loadUserData();
    }
  }, [token, userId, dispatch]);

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
                {userInfo && (
                  <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
                )}
                {currUserId === userId && <PostInput />}
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
