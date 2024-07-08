import { React, useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { useQuery, gql, useMutation } from "@apollo/client";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

const FETCH_BOOKS = gql`
  query FetchAllBooks {
    fetchAllBooks {
      id
      title
      category
      price
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBookFromDatabase($bookID: ID!) {
    deleteBookFromDatabase(id: $bookID) {
      success
      message
      statusCode
    }
  }
`;

function ViewBooks() {
  const { data, loading, error } = useQuery(FETCH_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      const response = data.fetchAllBooks;
      setBooks(response);
      return;
    }
  }, [data]);

  const handleDeleteBook = async (id) => {
    try {
      const { data , errors } = await deleteBook({ variables: { bookID: id } });
      if (data) {
        if (data.deleteBookFromBackend?.success) {
          toast.success(
            data.deleteBookFromBackend.message || "Book deleted successfully"
          );
          setBooks(books.filter((book) => book.id !== id));
        }
      } else {
        toast.error(
          errors.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Something Went Wrong");
    }
  };

  return (
    <>
      <Toaster richColors position="top-right"></Toaster>
      <Navbar />
      <div className="grid grid-cols-6 mt-12 bg-amber-600 py-8">
        <span className="mx-auto text-xl text-white font-medium">ID</span>
        <span className="mx-auto text-xl text-white font-medium">Title</span>
        <span className="mx-auto text-xl text-white font-medium">Category</span>
        <span className="mx-auto text-xl text-white font-medium">Price</span>
        <span className="mx-auto text-xl text-white font-medium">View</span>
        <span className="mx-auto text-xl text-white font-medium">Remove</span>
      </div>

      {loading ? (
        <span className="block text-center mt-16 font-bold text-4xl">
          Loading Please Wait....
        </span>
      ) : (
        <div className="mt-8">
          {books.map((item) => {
            return (
              <div
                className="grid grid-cols-6 my-4 bg-zinc-200 py-4 items-center"
                key={item.id}
              >
                <span className="mx-auto font-medium">{item.id}</span>
                <span className="mx-auto font-medium">{item.title}</span>
                <span className="mx-auto font-medium">{item.category}</span>
                <span className="mx-auto font-medium">INR-{item.price}</span>
                <Link to={`/admin/view_book/${item.id}`} className="mx-auto bg-purple-600 px-6 py-1 font-medium text-white rounded-md hover:underline">
                  View
                </Link>
                <button
                  onClick={() => handleDeleteBook(item.id)}
                  className="mx-auto bg-red-600 px-6 py-1 font-medium text-white rounded-md hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ViewBooks;
