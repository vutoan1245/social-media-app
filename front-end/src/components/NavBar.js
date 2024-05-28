import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "state/state";

const NavBar = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);

  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(setLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/home"}>
          Social Media App
        </Link>
        {isAuth && (
          <Link className="nav-link" onClick={onSignOut}>
            Sign out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
