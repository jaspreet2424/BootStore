import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const buttons = [
  {
    id: 1,
    text: "All",
    filterBookBy : "",
  },
  {
    id: 2,
    text: "Love & Romance",
    filterBookBy : "Love & Romance",
  },
  {
    id: 3,
    text: "Business & Finance",
    filterBookBy : "Business & Finance",
  },
  {
    id: 4,
    text: "Action & Adventure",
    filterBookBy : "Action & Adventure",
  },
  {
    id: 5,
    text: "Biography",
    filterBookBy : "Biography",
  },
  {
    id: 6,
    text: "Art & Photography",
    filterBookBy : "Art & Photography",
  },
];

const query = gql`
  query FetchAllBooks {
    fetchAllBooks {
      id
      title
      author
      image
      price
      discount
      category
    }
  }
`;

function Books() {
  const { data, loading, error } = useQuery(query);
  const [books, setBooks] = useState([]);
  const [filterBook , setFilterBook] = useState("");
  const [isLoggedIn , setIsLoggedIn] = useState("");

  useEffect(() => {
    if (data) {
      const response = data.fetchAllBooks;
      setBooks(response);
      return;
    }
  }, [data]);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") || "");
  },[])

  return (
    <div className="w-full py-20">
      <div className="filter-container">
        <h3 className="text-black text-center lg:text-5xl sm:text-3xl xs:text-3xl font-bold">
          Filter Books By Categories
        </h3>
        <div className="filter-buttons grid my-6 lg:grid-cols-6 sm:grid-cols-3 xs:grid-cols-2">
          {buttons.map((item) => {
            return (
              <button
                className="text-lg mx-6 my-3 px-4 font-medium py-1 rounded-lg text-black bg-amber-400 focus:bg-amber-900 focus:text-white"
                key={item.id}
                onClick={() => setFilterBook(item.filterBookBy)}
              >
                {item.text}
              </button>
            );
          })}
        </div>

        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {books.filter((book)=> book.category.includes(filterBook)).map((item) => {
            return (
              <div
                key={item.id}
                className="mx-auto my-10 w-72 bg-white"
                style={{ height: "500px" }}
              >
                <div className="img-container h-2/3">
                  <img src={item.image} alt="" className="h-full w-full" />
                </div>
                <div className="flex flex-col px-2 h-1/3  gap-2 pt-2">
                  <span>
                    <b>Title</b> : {item.title}
                  </span>
                  <span>
                    <b>Author</b> : {item.author}
                  </span>
                  <div className="flex justify-between">
                    <span>
                      <b>Price</b> :{" INR-"} 
                      {
                        item.price && item.discount ? (
                            <>
                            <span className="line-through font-medium text-red-600 text-xl">{item.price}</span>
                            <span className="font-medium text-xl ml-3">{item.price - item.discount}</span>
                            </>
                        ) : (
                          <span className="font-medium text-xl">{item.price}</span>
                        )
                      }
                    </span>
                  </div>

                  <div className="buttons-cont flex justify-between px-2 py-1">
                    <button>
                      <i className="fa-solid fa-bookmark text-2xl text-black"></i>
                    </button>
                    <Link
                      to={isLoggedIn ? `/book/${item.id}` : `/login`}
                      className="bg-amber-500 px-8 py-1 font-medium text-lg rounded-md"
                    >
                      Buy Now
                    </Link>
                    <button>
                      <i className="fa-solid fa-shopping-cart text-2xl text-black"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Books;
