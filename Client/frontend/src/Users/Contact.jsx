import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CONTACT_MESSAGE_QUERY = gql`
  mutation ContactMessage(
    $name: String
    $email: String
    $mobile: String
    $profession: String
    $message: String
  ) {
    contactMessage(
      name: $name
      email: $email
      mobile: $mobile
      profession: $profession
      message: $message
    ) {
      success
      message
    }
  }
`;

function Contact() {
  const [contactMessage, { loading, data, error }] = useMutation(
    CONTACT_MESSAGE_QUERY
  );
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    mobile: "",
    profession: "",
    message: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    contactMessage({ variables: {...messageData}});
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-200">
      <div className="contact-div lg:w-3/4 md:w-3/4 sm:w-3/4 xs:w-full h-3/4 flex lg:flex-row md:flex-col sm:flex-col  bg-white">
        <div className="left flex-1 md:hidden sm:hidden xs:hidden lg:flex flex-col ">
          <div className="upper flex-1 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.923915358615!2d75.84930677528531!3d30.916750776716626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a839e46c5e995%3A0x7bd3ee400f2b302c!2sBooks%20Market%20Rd%2C%20Girja%20Ghar%20Chowk%2C%20Old%20Ludhiana%2C%20Ludhiana%2C%20Punjab%20141008!5e0!3m2!1sen!2sin!4v1718524824189!5m2!1sen!2sin"
              className="w-full h-full"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
          <div className="lower lg:w-full md:w-full flex-1  flex flex-col justify-center items-start gap-6 py-6 px-16">
            <div className="email-box flex  gap-2 items-center">
              <span className="text-xl font-medium">
                <i className="fa-solid fa-envelope text-xl"></i> Send a mail at
                :
              </span>
              <span className="text-slate-600">
                lucifermorninstar@gmail.com
              </span>
            </div>
            <div className="mobile-box flex gap-2 items-center">
              <span className="text-xl font-medium">
                <i className="fa-solid fa-phone text-xl"></i> Make a call at :
              </span>
              <span className="text-slate-600">+91-667766776677</span>
            </div>
            <div className="follow-us-box flex gap-4 items-center">
              <span className="text-xl font-medium">Follow Us On :</span>
              <div className="flex gap-6 mt-2">
                <i className="fa-brands fa-facebook text-2xl text-slate-600 cursor-pointer hover:text-blue-700"></i>
                <i className="fa-brands fa-instagram text-2xl text-slate-600 cursor-pointer hover:text-pink-800"></i>
                <i className="fa-brands fa-x-twitter text-2xl text-slate-600 cursor-pointer hover:text-black"></i>
                <i className="fa-brands fa-youtube text-2xl text-slate-600 cursor-pointer hover:text-red-700"></i>
              </div>
            </div>
            <span>
              Don't have an account{" "}
              <Link className="underline text-amber-700">
                create new account
              </Link>
            </span>
            <span>
              Explore some interesting books,{" "}
              <Link className="underline text-amber-700">click here</Link>
            </span>
          </div>
        </div>
        <div className="right flex-1">
          <form
            className="w-full lg:px-20 sm:px-10 xs:px-10 py-16 gap-6 flex flex-col"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="Enter your name"
              value={messageData.name}
              onChange={(e) =>
                setMessageData({ ...messageData, name: e.target.value })
              }
              className="px-4 py-1 border-b-2 border-b-orange-700 focus:outline-none"
            />
            <input
              type="text"
              value={messageData.email}
              onChange={(e) =>
                setMessageData({ ...messageData, email: e.target.value })
              }
              placeholder="Enter your Email"
              className="px-4 py-1 border-b-2 border-b-orange-700 focus:outline-none"
            />
            <input
              type="text"
              value={messageData.mobile}
              onChange={(e) =>
                setMessageData({ ...messageData, mobile: e.target.value })
              }
              placeholder="Enter your Number"
              className="px-4 py-1 border-b-2 border-b-orange-700 focus:outline-none"
            />
            <input
              type="text"
              value={messageData.profession}
              onChange={(e) =>
                setMessageData({ ...messageData, profession: e.target.value })
              }
              placeholder="Enter your Profession"
              className="px-4 py-1 border-b-2 border-b-orange-700 focus:outline-none"
            />
            <textarea
              rows={4}
              value={messageData.message}
              onChange={(e) =>
                setMessageData({ ...messageData, message: e.target.value })
              }
              className="px-4 py-1 border-b-2 border-b-orange-700 focus:outline-none"
              placeholder="Leave a message......."
            ></textarea>

            <button className="text-xl bg-amber-700 py-2 px-6 font-medium text-white">
              {loading ? "Loading...." : "Send Message"}
            </button>

            <Link to="/" className="text-center text-amber-700 underline">
              Back to Home Page
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
