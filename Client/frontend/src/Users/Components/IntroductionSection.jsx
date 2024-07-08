import React from "react";

function IntroductionSection() {
  return (
    <div className="section w-full h-screen relative">
      <div className="w-full h-full absolute">
        <img
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-auto"
          alt=""
        />
      </div>

      <div className="z-10 absolute top-20 left-0 right-0 mx-auto">
        <h1 className="text-4xl font-bold text-emerald-700 text-center">
          Explore best books at E-Book
        </h1>
        <div className="flex items-center justify-center mt-10">
          <button className="mx-auto px-10 py-2 bg-none text-emerald-700 font-medium border border-emerald-700 transition duration-300 hover:bg-emerald-700 hover:text-white">See More</button>
        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;
