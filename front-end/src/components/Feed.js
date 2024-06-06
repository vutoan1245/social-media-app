import { useSelector } from "react-redux";
import Post from "./Post";
import { makeSelectFeed } from "../state/selectors/selectors";

const Feed = () => {
  const { posts, user } = useSelector(makeSelectFeed);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
