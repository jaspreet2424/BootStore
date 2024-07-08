import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { toast, Toaster } from "sonner";
import {useNavigate} from 'react-router-dom';

const REGISTER_USER_QUERY = gql`
  mutation createNewUser($name: String!, $email: String!, $password: String!) {
    createNewUser(name: $name, email: $email, password: $password) {
      success
      message
      statusCode
    }
  }
`;

function Register() {
  const [createNewUser, { loading, data, error }] =
    useMutation(REGISTER_USER_QUERY);

  const [showPass, setShowPass] = useState(false);
  const [response, setResponse] = useState({
    success: "",
    message: "",
    statusCode: 0,
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleVisibility = () => {
    setShowPass(!showPass);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", userData.email);
    createNewUser({ variables: {...userData}});
  };

  useEffect(() => {
    if (data) {
      setResponse(data.createNewUser);
      return;
    }
  }, [data]);

  useEffect(() => {
    if (response.success === true && response.statusCode < 400) {
      navigate('/otp_verification')
      return;
    } else if(response.success === false && response.statusCode >= 400) {
      toast.error(response.message);
      return;
    }
    else if (error){
      toast.error(error.message);
      return;
    }
  },[response , error]);

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <div className="w-full h-screen flex bg-zinc-300 lg:flex-row">
        <div className="left flex-1 flex justify-center items-center">
          <form
            className="flex flex-col items-center gap-3 lg:w-3/4 sm:w-1/2 xs:w-full bg-white px-6 py-12 rounded-xl shadow-2xl"
            onSubmit={handleFormSubmit}
          >
            <span className="text-5xl font-medium text-amber-700">
              Register
            </span>
            <input
              type="text"
              placeholder="Enter your name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full px-4 py-2 text-lg focus:outline-none border-b-2 border-b-amber-700 mt-4"
            />
            <input
              type="text"
              placeholder="Enter your email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full px-4 py-2 text-lg focus:outline-none border-b-2 border-b-amber-700 mt-4"
            />
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter your Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="w-full px-4 py-2 text-lg focus:outline-none border-b-2 border-b-amber-700 mt-4"
            />

            <div className="flex items-center justify-start w-full mt-2">
              <input
                type="checkbox"
                id="check"
                onClick={toggleVisibility}
                className="w-4 h-4"
              />
              <label htmlFor="check" className="ml-2">
                Show Password
              </label>
            </div>

            <button className="text-xl bg-amber-700  w-full mt-4 py-2 px-6 font-medium text-white">
              {loading ? "Loading...." : "Register"}
            </button>

            <span className="mt-4">
              Already have an account?{" "}
              <Link className="underline text-amber-700" to="/login">
                click here
              </Link>{" "}
            </span>
          </form>
        </div>
        <div className="right flex-1 lg:block sm:hidden xs:hidden relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1677187301439-bc2201360443?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Not Found"
            className="w-full h-full bg-cover absolute"
          />
          <div className="w-full h-full absolute bg-black opacity-60"></div>
          <div className="w-full h-full flex flex-col text-center px-16 gap-6 items-center justify-center absolute z-10">
            <h3 className="text-5xl text-white font-medium">
              Welcome to E-BOOK
            </h3>
            <p className="text-md text-slate-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              eligendi inventore doloribus explicabo dolorum non adipisci dolor
              repellendus, voluptates dolorem molestias animi placeat laboriosam
              esse vitae libero odit officiis sint? Eaque quos sed dolorem
              soluta eligendi quam libero ipsam at.
            </p>
            <span className="text-md text-white">
              Want to Contact Us{" "}
              <Link className="text-amber-300 underline">Click Here</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
