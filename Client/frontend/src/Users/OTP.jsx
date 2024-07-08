import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const OTP_QUERY = gql`
  mutation verifyOTP($email: String!, $otp: Int!) {
    verifyOTP(email: $email, otp: $otp) {
      success
      message
      statusCode
    }
  }
`;

function OTP() {
  const email = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "abc@gmail.com";

  const [verifyOTP, { loading, data, error }] = useMutation(OTP_QUERY);
  const [otp, setOtp] = useState("");
  const [response, setResponse] = useState({
    success: "",
    message: "",
    statusCode: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setResponse(data.verifyOTP);
      return;
    }
  }, [data]);

  useEffect(() => {
    if (response.success === true && response.statusCode < 400) {
      localStorage.removeItem('email');
      navigate("/login");
      return;
    } else if (response.success === false && response.statusCode >= 400) {
      toast.error(response.message);
      return;
    } else if (error) {
      toast.error(error);
      return;
    }
  }, [response, error]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    verifyOTP({ variables: { email, otp: parseInt(otp) } });
  };

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <div className="w-100 h-screen bg-zinc-300 flex justify-center items-center">
        <form
          className="w-1/3 shadow-lg bg-white px-10 py-10 flex flex-col gap-6"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-center my-6 text-3xl text-amber-700 font-medium">
            OTP Verification
          </h1>
          <input
            type="text"
            className="border px-4 py-1 text-black"
            placeholder={`${email}`}
            disabled={true}
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-1 focus:outline-none border-b-2 border-b-amber-700"
            placeholder="Enter your OTP"
          />
          <button className="text-xl bg-amber-700  w-full mt-4 py-2 px-6 font-medium text-white">
            {loading ? "Loading...." : "Proceed"}
          </button>
        </form>
      </div>
    </>
  );
}

export default OTP;
