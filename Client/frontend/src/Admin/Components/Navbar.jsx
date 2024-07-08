import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full px-40 py-5 bg-amber-900 flex items-center justify-between ">
      <Link className="text-white text-2xl hover:underline" to="/admin/dashboard">
        Admin Dashboard
      </Link>

      <button className="bg-amber-400 text-white text-lg font-medium px-6 py-2 hover:bg-amber-600">
        Login
      </button>
    </div>
  );
}

export default Navbar;
