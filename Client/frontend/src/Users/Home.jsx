import React from "react";
import Navbar from "./Components/Navbar";
import Books from "./Books";

const categories = [
  {
    id: 1,
    title: "Love & Rommance",
    icon: "fa-heart",
    color: "text-pink-500",
  },
  {
    id: 2,
    title: "Action & Adventure",
    icon: "fa-fighter-jet",
    color: "text-zinc-800",
  },
  {
    id: 3,
    title: "Biography",
    icon: "fa-lightbulb",
    color: "text-amber-300",
  },
  {
    id: 4,
    title: "Business & Finance",
    icon: "fa-brain",
    color: "text-orange-300",
  },
];

function Home() {
  return (
    <>
      <Navbar />

      <div className="image-container w-full -z-20 fixed top-0 left-0 right-0 bottom-0 h-screen">
        <img
          src="https://images.unsplash.com/photo-1526285759904-71d1170ed2ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image Not Found"
          className="w-full h-full"
        />
      </div>

      <section className="section w-full">
        <div className="h-96 relative flex items-center justify-center">
          <div className="bg-black w-full h-full absolute opacity-60 -z-10"></div>
          <h3 className="text-white lg:text-5xl sm:text-3xl xs:text-3xl font-bold">
            E-Book Online Book Store
          </h3>
        </div>

        <section className="content-container bg-slate-200 w-full py-20 h-fit">
          <div className="show-cards-container flex flex-col gap-16">
            <h3 className=" lg:text-5xl sm:text-3xl xs:text-3xl text-center font-bold">
              Books By Categories
            </h3>
            <div className="cards grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
              {categories.map((item) => {
                return (
                  <div
                    className="flex flex-col w-64 bg-white rounded-lg shadow-lg items-center gap-4 py-6 my-10 mx-auto"
                    key={item.id}
                  >
                    <i
                      className={`fa-solid ${item.icon} text-6xl ${item.color}`}
                    ></i>
                    <span className="text-2xl text-slate-600">
                      {item.title}
                    </span>
                    <span className="text-3xl text-slate-500">{item.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Books />
        </section>
      </section>
    </>
  );
}

export default Home;
