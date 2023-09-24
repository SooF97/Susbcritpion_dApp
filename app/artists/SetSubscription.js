"use client";
import React, { useState } from "react";
import Modal from "../components/Modal";
import { ethers } from "ethers";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Subscription from "../Subscription.json";

export default function SetSubscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState();
  const [yearlyPrice, setYearlyPrice] = useState();
  const [prices, setPrices] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleMonth(e) {
    console.log(e.target.value);
    setMonthlyPrice(e.target.value);
  }

  function handleYear(e) {
    console.log(e.target.value);
    setYearlyPrice(e.target.value);
  }

  async function pricesTo() {
    setPrices(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        const contract = new ethers.Contract(
          Subscription.address,
          Subscription.abi,
          signer
        );
        const weiValue1 = ethers.utils.parseUnits(
          monthlyPrice.toString(),
          "ether"
        );
        const weiValue2 = ethers.utils.parseUnits(
          yearlyPrice.toString(),
          "ether"
        );
        const transaction = await contract.setSubscription(
          weiValue1,
          weiValue2
        );
        await transaction.wait();
        toast("Subscriptions created successfully!", { type: "success" });
        console.log(transaction);
      }
    } catch (error) {
      console.log(error);
    }
    setPrices(false);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="bg-lime-300  text-black font-bold py-2 px-4 rounded-full"
        onClick={openModal}
      >
        Set your monthly and yearly prices
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ToastContainer />
        <div className="flex items-center justify-center">
          <div className=" p-4 rounded-lg ">
            <h2 className="text-2xl font-semibold mb-4">Choose a Period</h2>
            <div className="flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="number"
                className="block text-gray-700 font-bold mb-2"
              >
                Monthly Price in MATIC
              </label>
              <input
                type="number"
                id="number"
                name="number"
                placeholder="Monthly price"
                onChange={handleMonth}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <label
                htmlFor="number2"
                className="block text-gray-700 font-bold mb-2"
              >
                Yearly Price in MATIC
              </label>
              <input
                type="number"
                id="number2"
                name="number2"
                onChange={handleYear}
                placeholder="Yearly price"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <div className="text-center">
                {monthlyPrice && yearlyPrice > 0 ? (
                  <button
                    className="bg-lime-300 text-black px-4 py-2 rounded-lg hover:bg-lime-500 focus:outline-none"
                    onClick={pricesTo}
                  >
                    Submit
                    {prices && (
                      <div className="mt-2 flex justify-center">
                        <Loading
                          type="spin"
                          color="black"
                          height={20}
                          width={20}
                        />
                      </div>
                    )}
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
