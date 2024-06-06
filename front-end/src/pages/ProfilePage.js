import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "components/NavBar";
import Feed from "components/Feed";
import PostInput from "components/PostInput";
import UserInfo from "components/UserInfo";
import { SpinnerIcon } from "assets/icons";
import { setPosts } from "state/state";
import { fetchUserData, fetchUserPosts } from "api/userApi";

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

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row mt-20">
        <div className="w-full md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto px-4">
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <SpinnerIcon className="text-black" animation="border" />
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
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
