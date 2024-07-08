import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { gql, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner";

const ADD_NEW_BOOK = gql`
  mutation AddNewBook(
    $title: String!
    $author: String!
    $summary: String!
    $category: String!
    $image: String!
    $price: Float!
  ) {
    addNewBook(
      title: $title
      author: $author
      summary: $summary
      category: $category
      image: $image
      price: $price
    ) {
      success
      message
      statusCode
    }
  }
`;

function AddBook() {
  const [addNewBook, { data, loading, error }] = useMutation(ADD_NEW_BOOK);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    summary: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      if (data.addNewBook.success) {
        toast.success(data.addNewBook.message);
        setBookData({
          title: "",
          author: "",
          summary: "",
          category: "",
          price: "",
          image: "",
        });
      } else {
        toast.error(data.addNewBook.message || "Failed to add book");
      }
    }
  }, [data]);
  
  useEffect(() => {
    if(error){
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  },[error])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, author, summary, category, price, image } = bookData;
    addNewBook({
      variables: {
        title,
        author,
        summary,
        category,
        price: parseFloat(price),
        image,
      },
    });
  };

  return (
    <>
      <Toaster richColors position="top-right"></Toaster>
      <Navbar />
      <div className="bg-zinc-200 w-full h-screen flex items-center justify-center">
        <form
          className="flex flex-col items-center py-6 px-12 lg:w-1/2 md:w-3/4 sm:w-full xs:w-full gap-4 bg-white mt-16"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-2xl text-amber-700 font-medium">Add New Book</h1>
          <input
            type="text"
            value={bookData.title}
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
            placeholder="Enter title of Book"
            className="w-full bg-zinc-100 px-4 py-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter author of Book"
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
            className="w-full bg-zinc-100 px-4 py-1 focus:outline-none"
          />
          <input
            type="text"
            value={bookData.price}
            onChange={(e) =>
              setBookData({ ...bookData, price: e.target.value })
            }
            placeholder="Enter price of Book"
            className="w-full bg-zinc-100 px-4 py-1 focus:outline-none"
          />
          <textarea
            rows="5"
            value={bookData.summary}
            onChange={(e) =>
              setBookData({ ...bookData, summary: e.target.value })
            }
            className="w-full bg-zinc-100 px-4 py-1 focus:outline-none"
            placeholder="Brief Summary of Book"
          ></textarea>
          <div className="w-full flex justify-between">
            <label htmlFor="category">Select Category : </label>
            <select
              id="category"
              className="border border-black px-4"
              value={bookData.category}
              onChange={(e) =>
                setBookData({ ...bookData, category: e.target.value })
              }
            >
              <option>Select Category</option>
              <option value="Love & Romance">Love & Romance</option>
              <option value="Action & Adventure">Action & Adventure</option>
              <option value="Business & Finance">Business & Finance</option>
              <option value="Meditation">Meditation</option>
              <option value="Art & Photography">Art & Photography</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Enter the link the book"
            value={bookData.image}
            onChange={(e) =>
              setBookData({ ...bookData, image: e.target.value })
            }
            className="w-full bg-zinc-100 px-4 py-1 focus:outline-none"
          />
          {/* <div className="w-full flex justify-between">
            <label htmlFor="image">Upload Book Image : </label>
            <input type="file" id="image" />
          </div> */}

          <button className="bg-amber-700 text-white text-lg w-full py-1 hover:bg-amber-500 mt-3">
            {loading ? "Loading....." : "Upload Now"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBook;
