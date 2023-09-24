"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Subscription from "../Subscription.json";

import Link from "next/link";

const page = ({ params }) => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [fetched, setFetched] = useState(false);
  const [submited, setSubmited] = useState(false);

  const [selectedOption, setSelectedOption] = useState();

  const [exclusiveContent, setExclusiveContent] = useState([]);

  async function fetchArtist() {
    setFetched(true);
    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        "mrvXire3FFkkoWo_HFHsBmRpJDRh1snd"
      );

      const contract = new ethers.Contract(
        Subscription.address,
        Subscription.abi,
        provider
      );
      const data = await contract.artistMapping(params.artistAddress);
      console.log("data from smart contract", data);
      setName(data[1]);
      setProfile(data[2]);
      const valueMonth = weiToEth(data[3]);
      const valueYear = weiToEth(data[4]);
      console.log("month", valueMonth);
      setMonth(valueMonth);
      setYear(valueYear);
    } catch (error) {
      console.log(error);
    }
    setFetched(false);
  }
  const weiToEth = (valueInWei) => {
    const valueInBN = ethers.BigNumber.from(valueInWei);
    const valueInEth = ethers.utils.formatEther(valueInBN);
    return valueInEth;
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    console.log("Selected option:", selectedValue);
  };

  async function handleSubmit() {
    setSubmited(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const contract = new ethers.Contract(
        Subscription.address,
        Subscription.abi,
        signer
      );
      if (selectedOption == 30) {
        const weiValue1 = ethers.utils.parseEther(month.toString());
        const transaction = await contract.subscribeTo(
          params.artistAddress,
          selectedOption,
          { value: weiValue1 }
        );
        await transaction.wait();
        toast("Subscribed 1 Month!", { type: "success" });
        console.log(transaction);
      } else if (selectedOption == 365) {
        const weiValue2 = ethers.utils.parseEther(year.toString());
        const transaction = await contract.subscribeTo(
          params.artistAddress,
          selectedOption,
          { value: weiValue2 }
        );
        await transaction.wait();
        toast("Subscribed 1 Year!", { type: "success" });
        console.log(transaction);
      }
    } catch (error) {
      console.log(error);
    }
    setSubmited(false);
  }

  async function retrieveContent() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const contract = new ethers.Contract(
        Subscription.address,
        Subscription.abi,
        signer
      );
      const data = await contract.fetchContent(params.artistAddress);
      console.log("data is", data);
      setExclusiveContent(data);
    } catch (error) {
      console.log(error);
    }
  }

  function unixTimestampToDate(unixTimestamp) {
    // Create a new Date object by multiplying the Unix timestamp by 1000 (to convert from seconds to milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Create a formatted date string (e.g., "YYYY-MM-DD HH:MM:SS")
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  useEffect(() => {
    fetchArtist();
    retrieveContent();
  }, []);
  return (
    <div>
      <ToastContainer />
      {fetched ? (
        <div className="flex flex-col justify-center items-center mt-8 ">
          <Loading type="spin" color="#000000" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            {/* Product Image Section */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={profile}
                alt="productImage"
                className="rounded-md w-full "
              />
            </div>

            {/* Product Details and Quantity Section */}
            <div className="px-4 py-6">
              <h1 className="text-3xl font-bold mb-4">
                {params.artistAddress.slice(0, 4)}...
                {params.artistAddress.slice(-4)}
              </h1>
              <h1 className="text-3xl font-bold mb-4">{name}</h1>
              <p className="text-gray-600 mb-4">Monthly : {month} MATIC</p>
              <p className="text-gray-600 mb-4">Yearly : {year} MATIC</p>
              <div className="relative inline-flex">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    fill="#1D1E21"
                    d="M406.3 1.7c3.1-3.1 8.2-3.1 11.3 0s3.1 8.2 0 11.3L207 229.1c-1.6 1.6-3.7 2.4-5.7 2.4s-4.1-.8-5.7-2.4L1.7 13c-3.1-3.1-3.1-8.2 0-11.3s8.2-3.1 11.3 0L206 194.4l192.3-192.4z"
                  />
                </svg>
                <select
                  className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                  id="subscription"
                  name="subscription"
                  onChange={handleSelectChange}
                  required
                >
                  <option value="Choose">Choose Subscription</option>
                  <option value="30">30 Days</option>
                  <option value="365">365 Days</option>
                </select>
              </div>
              <div className="flex flex-col justify-center items-center m-2">
                {selectedOption && (
                  <button
                    className="bg-lime-300 text-black px-4 py-2 rounded-lg hover:bg-lime-500 focus:outline-none"
                    onClick={handleSubmit}
                  >
                    Submit{" "}
                  </button>
                )}
              </div>
              {submited && (
                <div className="mt-2 flex justify-center">
                  <Loading type="spin" color="black" height={20} width={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        {exclusiveContent.length > 0 ? (
          <div className="flex flex-col justify-center items-center gap-1 p-4">
            <Link href={`${exclusiveContent[0]}`} target="_blank">
              <button className="bg-lime-300 text-black px-4 py-2 rounded-lg hover:bg-lime-500 focus:outline-none">
                Download Music
              </button>
            </Link>

            <audio controls>
              <source src={exclusiveContent[0]} type="audio/mpeg" />
            </audio>
            <p className="text-xl font-semibold">
              Subscription starts :{" "}
              <span className="italic">
                {unixTimestampToDate(exclusiveContent[2].toString())}
              </span>
            </p>
            <p className="text-xl font-semibold">
              Subscription ends :{" "}
              <span className="italic">
                {unixTimestampToDate(exclusiveContent[3].toString())}
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-2">
            <h1 className="font-bold text-xl">You are not subscribed</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
