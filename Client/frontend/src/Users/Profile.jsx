import React from "react";
import Navbar from "./Components/Navbar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="w-full h-96 flex bg-slate-200 border-b border-b-black">
        <div className="profile-div w-1/3 h-full flex flex-col gap-6 items-center justify-center">
            <h1 className="text-3xl">User Profile</h1>
          <div className="img-container w-64 h-64  rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>

        <div className="details-div w-2/3 h-full flex">
            <div className="flex-1 flex flex-col gap-5 py-10 px-12">
                <div className="">
                    <h3 className="text-2xl font-medium">Name</h3>
                    <span className="text-xl text-slate-700">Jaspreet Singh</span>
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium">Email</h3>
                    <span className="text-xl text-slate-700">singhjaspreet2425@gmail.com</span>
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium">Gender</h3>
                    <span className="text-xl text-slate-700">Males</span>
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium">Mobile</h3>
                    <span className="text-xl text-slate-700">+91 7696993411</span>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-5 py-10 px-12">
            <div className="">
                    <h3 className="text-2xl font-medium">City</h3>
                    <span className="text-xl text-slate-700">Ludhiana</span>
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium">State</h3>
                    <span className="text-xl text-slate-700">Punjab</span>
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium">Country</h3>
                    <span className="text-xl text-slate-700">India</span>
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium">PIN</h3>
                    <span className="text-xl text-slate-700">141003</span>
                </div>
            </div>
        </div>

      </div>
    </>
  );
}

export default Profile;
