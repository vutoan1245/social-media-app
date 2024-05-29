import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/state";

const HomePage = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });
        const posts = await response.json();

        if (posts) dispatch(setPosts({ posts }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col md={3}>
            <SideBar />
          </Col>
          <Col md={9}>
            <Feed />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
