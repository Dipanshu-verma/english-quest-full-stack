import React, { useDebugValue } from "react";
import { useState } from "react";
import "./auth.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAction, registerAction } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [signupForm, setShignupForm] = useState(true);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onchangeUserData(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      if (signupForm) {
        await dispatch(registerAction(userData));

        alert("Signup successful");
        setUserData({
          email: "",
          password: "",
        });
        setShignupForm(false);
       
      } else {
        await dispatch(loginAction(userData));

        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
        For creating <span class="text-blue-500">CREATOR</span> account, you
        have to add "creator" before @ in your email while signup.
      </h1>
      <div className="w-[380px] m-auto rounded-2xl p-[1.5rem] text-center border mt-10">
        <h1 className="text-3xl font-bold mb-8">
          {signupForm ? "Singup Form" : "Login Form"}{" "}
        </h1>

        <div className="rounded-2xl w-full border relative">
          <div
            style={{ zIndex: "-1" }}
            className={`w-[50%] h-full absolute bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl border top-0   ${
              signupForm ? "formclasssignup" : "formclasslogin"
            }`}
          ></div>

          <button
            className={`rounded-2xl w-[50%] ${
              signupForm ? "text-black" : "text-white"
            } text-center text-2xl py-2  `}
            onClick={() => {
              
              setUserData({
                email: "",
                password: "",
              });
              setShignupForm(false);

            }}
          >
            Login
          </button>
          <button
            className={`rounded-2xl  w-[50%] ${
              signupForm ? "text-white" : "text-black"
            } text-center text-2xl py-2 `}
            onClick={() => {
              setUserData({
                email: "",
                password: "",
              });
              setShignupForm(true);

            
            }}
          >
            Signup
          </button>
        </div>

        <div className="overflow-hidden relative  h-[50vh]">
          <form
            action=""
            onSubmit={handleForm}
            className={`py-3 absolute top-0 bottom-0 ${
              signupForm ? "hideLoginForm" : "showLoginForm"
            }`}
          >
            <input
              type="text"
              placeholder="Email"
              onChange={onchangeUserData}
              className="w-full border rounded-xl px-3 py-2 mt-5 focus:bg-slate-100 text-black"
              name="email"
              required
            />

            <input
              type="text"
              placeholder="Password"
              onChange={onchangeUserData}
              className="w-full border rounded-xl focus:bg-slate-100 text-black  px-3 py-2 mt-5 "
              name="password"
              required
            />
            <p className="text-blue-500 text-left mt-1 ml-1 cursor-pointer">
              Forgot Password?
            </p>

            <input
              type="submit"
              value="Login"
              className=" cursor-pointer  w-full border rounded-xl px-3 py-2 mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-semibold"
            />

            <p className="mt-3 ">
              Not a member?{" "}
              <span
                onClick={() => {
                  
                  setUserData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                  setShignupForm(true);

                }}
                className="text-blue-500 opacity-70 cursor-pointer"
              >
                Singup now
              </span>
            </p>
          </form>

          <form
            action=""
            onSubmit={handleForm}
            className={`absolute top-0 bottom-0 ${
              signupForm ? "showSignupForm" : "hideSignupForm"
            }`}
          >
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              onChange={onchangeUserData}
              className="w-full border rounded-xl px-3 py-2 mt-5 focus:bg-slate-100 text-black"
            />

            <input
              type="text"
              placeholder="Password"
              name="password"
              required
              onChange={onchangeUserData}
              className="w-full border rounded-xl px-3 py-2 mt-5 focus:bg-slate-100 text-black"
            />

            <input
              type="submit"
              value="Signup"
              className=" cursor-pointer w-full border rounded-xl px-3 py-2 mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-semibold"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
