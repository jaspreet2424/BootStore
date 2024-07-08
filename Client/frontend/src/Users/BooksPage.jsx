import React from "react";
import Navbar from "./Components/Navbar";
import Books from "./Books";

function BooksPage() {
  return (
    <>
      <Navbar />

      <div className="image-container w-full -z-20 fixed top-0 left-0 right-0 bottom-0 h-screen">
        <img
          src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

        <section className="bg-slate-200 w-full py-20 h-fit">
          <Books />
        </section>
      </section>
    </>
  );
}

export default BooksPage;
