"use client";
import React, { useState } from "react";
import Modal from "../components/Modal";
import { ethers } from "ethers";

import FormData from "form-data";
import axios from "axios";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Subscription from "../Subscription.json";

export default function CreateProfile() {
  const API_KEY = "0c61222bc1ea3c068ab4";
  const API_SECRET =
    "ad8d7ccf60595dc5af6149eac18b1f6556a64f61bcf82c27903d2761e3a472b2";

  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [created, setCreated] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleName(e) {
    console.log("name is : ", e.target.value);
    setName(e.target.value);
  }

  async function imageToIpfs(e) {
    e.preventDefault();
    setImageIsUploading(true);
    try {
      const file = e.target.files[0];
      console.log("filename:", file.name);
      // initialize the form data
      const formData = new FormData();

      // append the file form data to
      formData.append("file", file);

      const response = await axios.post(url, formData, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
        },
      });

      console.log(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      setProfileImage(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      toast("Uploaded successfully !", { type: "success" });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setImageIsUploading(false);
  }

  async function create() {
    setCreated(true);
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
        const transaction = await contract.createProfile(name, profileImage);
        await transaction.wait();
        toast("Profile created successfully!", { type: "success" });
        console.log(transaction);
      }
    } catch (error) {
      console.log(error);
    }
    setCreated(false);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="bg-lime-300  text-black font-bold py-2 px-4 rounded-full"
        onClick={openModal}
      >
        Create your profile
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ToastContainer />
        <div className="max-w-md mx-auto p-6  rounded-md ">
          <h2 className="text-2xl font-semibold mb-4">Create your profile</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleName}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload profile image
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={imageToIpfs}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {imageIsUploading && (
              <div className="mt-2 flex justify-center">
                <Loading type="spin" color="black" height={20} width={20} />
              </div>
            )}
          </div>
          <div className="text-center">
            {profileImage.length > 0 ? (
              <button
                className="bg-lime-300 text-black px-4 py-2 rounded-lg hover:bg-lime-500 focus:outline-none"
                onClick={create}
              >
                Submit
                {created && (
                  <div className="mt-2 flex justify-center">
                    <Loading type="spin" color="black" height={20} width={20} />
                  </div>
                )}
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
