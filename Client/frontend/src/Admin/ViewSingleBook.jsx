import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Toaster, toast } from "sonner";
import Navbar from "./Components/Navbar";

const FETCH_SINGLE_BOOK = gql`
  query Query($fetchSingleBookId: ID!) {
    fetchSingleBook(id: $fetchSingleBookId) {
      id
      title
      author
      summary
      category
      image
      price
      discount
    }
  }
`;

const ADD_DISCOUNT = gql`
  mutation AddDiscount($bookId: ID!, $discount: Float!) {
    addDiscount(id: $bookId, discount: $discount) {
      success
      message
      statusCode
    }
  }
`;

function ViewSingleBook() {
  const { id } = useParams();

  const [singleBook, setSingleBook] = useState({});
  const [response, setResponse] = useState({
    success: "",
    message: "",
    statusCode: 0,
  });
  const [discount , setDiscount] = useState("");

  const { data, loading, error } = useQuery(FETCH_SINGLE_BOOK, {
    variables: { fetchSingleBookId: id },
    skip: !id,
  });
  const [addDiscountMutation] = useMutation(ADD_DISCOUNT);

  useEffect(() => {
    if (data) {
      const response = data.fetchSingleBook;
      setSingleBook(response);
    }
  }, [data]);

  useEffect(() => {
    if (response.success === true && response.statusCode === 200) {
      toast.success(response.message || "Discount updated successfully");
      return;
    } else if (response.success === false && response.statusCode >= 400) {
      toast.error(response.message);
    }
  }, [response]);

  const handleDiscountAction = async () => {
    try {
      const { data, errors } = await addDiscountMutation({ variables: { bookId: id , discount : parseFloat(discount) } });
      if (data) {
        setResponse(data.addDiscount);
        setDiscount("");
        return;
      } else {
        toast.error(errors.message || "Something went wrong");
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <Navbar />
      <div className="w-full h-screen bg-white">
        <div className="w-full h-full" style={{ display: "flex" }}>
          <div className="left h-full" style={{ flex: "4" }}>
            <div className="flex" style={{ height: "60%" }}>
              <div className="image_containe h-full flex-1 flex items-center justify-center px-12 py-10">
                {loading ? (
                  <span className="text-3xl text-center">Loading Please Wait.....</span>
                ) : (
                  <img src={singleBook.image} alt="" className="h-full" />
                )}
              </div>
              <div className="book_details flex-1 px-12 py-10 flex flex-col">
                <h1 className="text-4xl">{singleBook.title}</h1>
                <span className="text-slate-500">
                  By {"("}Author{")"} {singleBook.author}
                </span>
                <span className="mt-4 text-2xl">
                  Price : INR-{singleBook.price}
                </span>
                <span className="mt-4 text-2xl">
                  Discount on book : INR-
                  {singleBook.discount ? singleBook.discount : "0"}
                </span>
                <div className="flex flex-col gap-2 mt-16 w-full">
                  <div className="w-full flex justify-around">
                    <input
                      type="text"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="border-2 w-2/3  border-slate-400 hover:border-slate-600 px-6 py-2"
                      placeholder="Discount on product"
                    />
                    <button
                      className="bg-amber-500 px-8 font-medium w-1/3"
                      onClick={handleDiscountAction}
                    >
                      Add Discount
                    </button>
                  </div>
                  <div className="w-full flex justify-around">
                    <input
                      type="text"
                      className="border-2  w-2/3  border-slate-400 hover:border-slate-600 px-6 py-2"
                      placeholder="Update Price of Product"
                    />
                    <button className="bg-amber-500 px-8 font-medium  w-1/3 ">
                      Update Price
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full border-t border-t-slate-300 flex flex-col items-start gap-1 px-16 py-16">
              <h1 className="text-3xl text-black">Description</h1>
              <p className="text-slate-500">{singleBook.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSingleBook;
