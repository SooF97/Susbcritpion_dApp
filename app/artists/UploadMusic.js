"use client";
import React, { useState } from "react";
import Modal from "../components/Modal";
import { ethers } from "ethers";

import FormData from "form-data";
import axios from "axios";

import Subscription from "../Subscription.json";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadMusicToChain() {
  const API_KEY = "0c61222bc1ea3c068ab4";
  const API_SECRET =
    "ad8d7ccf60595dc5af6149eac18b1f6556a64f61bcf82c27903d2761e3a472b2";

  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [musicIsUploading, setMusicIsUploading] = useState(false);
  const [music, setMusic] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function musicToIpfs(e) {
    e.preventDefault();
    setMusicIsUploading(true);
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
      setMusicUrl(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      toast("Uploaded successfully !", { type: "success" });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setMusicIsUploading(false);
  }

  async function uploadMusicTo() {
    setMusic(true);
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
        const transaction = await contract.uploadMusic(musicUrl);
        await transaction.wait();
        toast("Music uploaded successfully!", { type: "success" });
        console.log(transaction);
      }
    } catch (error) {
      console.log(error);
    }
    setMusic(false);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="bg-lime-300  text-black font-bold py-2 px-4 rounded-full"
        onClick={openModal}
      >
        Upload your music song
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ToastContainer />
        <div className="max-w-md mx-auto p-6  rounded-md ">
          <h2 className="text-2xl font-semibold mb-4">Upload Your music</h2>

          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload music
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={musicToIpfs}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {musicIsUploading && (
              <div className="mt-2 flex justify-center">
                <Loading type="spin" color="black" height={20} width={20} />
              </div>
            )}
          </div>
          <div className="text-center">
            {musicUrl.length > 0 ? (
              <button
                className="bg-lime-300 text-black px-4 py-2 rounded-lg hover:bg-lime-500 focus:outline-none"
                onClick={uploadMusicTo}
              >
                Submit
                {music && (
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
