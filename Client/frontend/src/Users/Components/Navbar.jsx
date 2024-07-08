import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <nav className="w-full bg-amber-600 py-6 font-medium flex flex-row justify-around items-center">
      <Link to={"/"} href="#" className="text-4xl text-white">
        E-Book
      </Link>

      <ul className="flex flex-row gap-10">
        <Link to={"/"} className="text-lg text-white underline">
          Home
        </Link>
        <Link to={"/books"} className="text-lg text-white underline">
          Books
        </Link>
        <Link to={"/contact"} className="text-lg text-white underline">
          Contact
        </Link>
        <Link to={"/"} className="text-lg text-white underline">
          Services
        </Link>
      </ul>

      <div className="flex gap-4">
        {isLoggedIn ? (
          <Link
            to="/logout"
            className="underline rounded-md px-4 py-1 font-medium text-xl"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-amber-400 rounded-md px-4 py-1 font-medium text-xl"
          >
            Login <i className="fa-solid fa-user"></i>
          </Link>
        )}
        <button className="bg-amber-900 rounded-md text-white px-4 py-1 font-medium text-xl">
          Cart <i className="fa-solid fa-shopping-cart"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
