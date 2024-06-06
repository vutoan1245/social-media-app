import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/state";
import PostInput from "components/PostInput";
import { fetchPosts } from "api/postsApi";

const HomePage = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts(token);
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
      loadPosts();
    }
  }, [token, dispatch]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row mt-20">
        <div className="w-full md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <PostInput />
              <Feed />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
