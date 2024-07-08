import React from "react";
import { Link } from "react-router-dom";

function Introduction() {
  const navigateLinks = [
    {
      id: 1,
      title: "Add new book",
      path: "/admin/add_book",
      icon : "fa-book-open-reader"
    },
    {
      id: 2,
      title: "View all books",
      path: "/admin/view_books",
      icon : "fa-book"
    },
    {
      id: 3,
      title: "View all Users",
      path: "/admin/view_Users",
      icon : "fa-user"
    },
    {
      id: 4,
      title: "View all Orders",
      path: "/admin/view_Users",
      icon : "fa-shopping-cart"
    },
    {
      id: 5,
      title: "Change Password",
      path: "/admin/view_Users",
      icon : "fa-key"
    },
  ];

  return (
    <div className="w-full h-screen bg-zinc-200 flex flex-col pt-12">
      <h1 className="text-center text-3xl text-black">
        Welcome Back Mr.Jaspreet Singh
      </h1>
      <div className="grid grid-cols-3 mt-10">
        {navigateLinks.map((item) => {
          return (
            <Link key={item.id} to={item.path} className="mx-auto my-10 px-4 bg-white rounded-md w-72 py-6 flex flex-col gap-4 items-center justify-center hover:bg-amber-100">
              <span className="text-black text-2xl">{item.title}</span>
              <i className={`fa-solid ${item.icon} text-5xl`}></i>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Introduction;
