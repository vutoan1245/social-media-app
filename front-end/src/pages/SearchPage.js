import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import profileHolder from "assets/Profile-Photo-Place-Holder.png";
import { search } from "api/searchApi";
import NavBar from "components/NavBar";
import Post from "components/Post";

const calculateTimeDifference = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const useQuery = () => {
  const [searchParams] = useSearchParams();
  return new URLSearchParams(searchParams);
};

const SearchPage = () => {
  const query = useQuery().get("query");
  const [results, setResults] = useState({ posts: [], users: [] });
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const res = await search(query, token);
          console.log(res);
          setResults(res);
        } catch (error) {
          console.error("Error searching:", error);
        }
      };
      fetchResults();
    }
  }, [query, token]);

  return (
    <>
      <NavBar />
      <div className="mt-20 h-full">
        <div className="flex flex-col bg-white md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto">
          <div className="text-lg border-b border-gray-400">
            <h2 className="p-4 border-b border-gray-400">
              Search Results for "{query}"
            </h2>
            <h3 className="text-lg font-semibold p-4">People</h3>
            {results.users.length > 0 ? (
              results.users.map((user) => (
                <div
                  key={user.id}
                  className="p-2 flex items-center"
                  role="button"
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  <img
                    src={
                      user.picturePath
                        ? `${process.env.REACT_APP_API_BASE_URL}/assets/${user.picturePath}`
                        : profileHolder
                    }
                    role="button"
                    alt="Profile"
                    className="w-12 h-12 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-md font-medium" role="button">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{`Joined ${calculateTimeDifference(
                      user.createdAt
                    )}`}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 px-4 pb-4">No users found</p>
            )}
          </div>

          <div className="">
            <h3 className="text-lg font-semibold px-4 pt-4">Posts</h3>
            {results.posts.length > 0 ? (
              results.posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <p className="text-sm text-gray-500 px-4 my-4">No posts found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
