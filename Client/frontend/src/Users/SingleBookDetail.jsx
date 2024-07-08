import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { useParams, Link} from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

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

function SingleBookDetail() {
  const [singleBook , setSingleBook] = useState({});
  const { id } = useParams();
  const { data, loading, error } = useQuery(FETCH_SINGLE_BOOK, {
    variables: { fetchSingleBookId: id },
    skip: !id,
  });

  useEffect(() =>{
    if(data){
      const response = data.fetchSingleBook;
      setSingleBook(response);
    }
  },[data]);

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-white">
        <div className="w-full h-full" style={{ display: "flex" }}>
          <div className="left h-full" style={{ flex: "4" }}>
            <div className="flex" style={{ height: "60%" }}>
              <div className="image_containerh-full flex-1 flex items-center justify-center px-12 py-10">
                <img src={singleBook.image} alt="" className="h-full" />
              </div>
              <div className="book_details flex-1 px-12 py-10 flex flex-col">
                <h1 className="text-4xl">{singleBook.title}</h1>
                <span className="text-slate-500">
                  By {"("}Author{")"} {singleBook.author}
                </span>
                <span className="text-2xl mt-4">
                      <b>Price</b> :{" INR- "} 
                      {
                        singleBook.price && singleBook.discount ? (
                            <>
                            <span className="line-through font-medium text-red-600">{singleBook.price}</span>
                            <span className="font-medium ml-3">{singleBook.price - singleBook.discount}</span>
                            </>
                        ) : (
                          <span className="font-medium">{singleBook.price}</span>
                        )
                      }
                    </span>
                <div className="flex flex-col gap-2 mt-8 w-full">
                  <button className="bg-transparent border-2 border-amber-500 text-amber-500 text-lg font-medium px-6 py-2 hover:bg-amber-500 hover:text-white">
                    Add to Wishlist
                  </button>
                  <button className="bg-transparent border-2 border-amber-700 text-amber-700 text-lg font-medium px-6 py-2 hover:bg-amber-700 hover:text-white">
                    Add to Cart
                  </button>
                  <button className="bg-transparent border-2 border-green-500 text-green-500 text-lg font-medium px-6 py-2 hover:bg-green-500 hover:text-white">
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full border-t border-t-slate-300 flex flex-col items-start gap-1 px-16 py-16">
              <h1 className="text-3xl text-black">Description</h1>
              <p className="text-slate-500">{singleBook.summary}</p>
            </div>
          </div>

          <div className="right bg-slate-300" style={{ flex: "1" }}></div>
        </div>
      </div>
    </>
  );
}

export default SingleBookDetail;
