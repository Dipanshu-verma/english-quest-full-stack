import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoutAction from "../../redux/actions";

const Navbar = () => {
  const { token, role } = useSelector((store) => store);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Books app</div>

        {token ? (
          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:underline"
              onClick={() => {
                dispatch(logoutAction());
              }}
            >
              <Link to="login">Logout</Link>
            </button>
            {role === "CREATOR" && (
              <Link to="/createpost" className="text-white hover:underline">
                Create Post
              </Link>
            )}

            <Link to="/dashboard" className="text-white hover:underline">
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
