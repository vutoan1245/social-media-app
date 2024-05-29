import { setPosts } from "state/state";
import Post from "./Post";
import PostInput from "./PostInput";
import { useDispatch, useSelector } from "react-redux";

const calculateTimeDifference = (startTimestamp, endTimestamp) => {
  const timeDifference = startTimestamp - endTimestamp;
  console.log(timeDifference);

  // Define time units and their conversion factors in milliseconds
  const timeUnits = [
    { unit: "days", milliseconds: 86400000 },
    { unit: "hours", milliseconds: 3600000 },
    { unit: "minutes", milliseconds: 60000 },
    { unit: "seconds", milliseconds: 1000 },
  ];

  // Find the biggest time unit for rounding
  let biggestUnit = timeUnits[timeUnits.length - 1];
  for (let i = 0; i < timeUnits.length; i++) {
    if (timeDifference >= timeUnits[i].milliseconds) {
      biggestUnit = timeUnits[i];
      break;
    }
  }

  // Calculate rounded time difference
  const roundedDifference = Math.ceil(
    timeDifference / biggestUnit.milliseconds
  );

  return roundedDifference + " " + biggestUnit.unit + " ago";
};

const Feed = () => {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLike = async (postId) => {
    try {
      const fetchRes = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );

      const res = await fetchRes.json();

      const newPosts = posts.map((post) => (post._id === res._id ? res : post));

      dispatch(setPosts({ posts: newPosts }));
    } catch (error) {}
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <PostInput />
      {posts.map((post) => (
        <Post
          key={post._id}
          postId={post._id}
          profilePic={"https://via.placeholder.com/50"}
          name={post.firstName + " " + post.lastName}
          content={post.content}
          timestamp={calculateTimeDifference(
            new Date(),
            new Date(post.createdAt)
          )}
          likes={Object.keys(post.likes).length}
          isLiked={post.likes[user._id]}
          onLike={onLike}
        />
      ))}
    </div>
  );
};

export default Feed;
