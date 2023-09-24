"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Subscription from "../Subscription.json";

const Page = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getArtists() {
    setIsLoading(true);
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
      const array = await contract.getAllArtists();
      console.log("First array of artists", array);
      const artistsArray = array.map(async (ar) => {
        const element = await contract.artistMapping(ar);
        return element;
      });
      const resolvedArtists = await Promise.all(artistsArray);
      console.log(resolvedArtists);
      setArtists(resolvedArtists);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching data");
    }
    setIsLoading(false);
  }

  const weiToEth = (valueInWei) => {
    const valueInBN = ethers.BigNumber.from(valueInWei);
    const valueInEth = ethers.utils.formatEther(valueInBN);
    return valueInEth;
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div>
      <ToastContainer />

      {isLoading ? (
        <div className="flex flex-col justify-center items-center mt-8 ">
          <Loading type="spin" color="#000000" />
        </div>
      ) : (
        <div>
          {artists.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold flex flex-col justify-center items-center m-3">
                Available Artists:
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {artists.map((artist, index) => (
                  <Link href={`/${artist[0]}`} key={index}>
                    <div className="relative bg-white rounded-md shadow-sm overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="flex flex-col items-center justify-center mt-3">
                        <img
                          src={artist[2]}
                          alt="artist image"
                          className="rounded-full object-cover"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {artist[0].slice(0, 4)}...{artist[0].slice(-4)}
                        </h3>
                        <p className="text-gray-600">{artist[1]}</p>

                        <div className="mt-4 flex flex-row items-center gap-2 justify-between">
                          <div className="flex flex-col">
                            <span className="text-indigo-600 font-semibold">
                              Monthly : {weiToEth(artist[3].toString())} MATIC
                            </span>
                            <span className="text-indigo-600 font-semibold">
                              Yearly : {weiToEth(artist[4].toString())} MATIC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className="flex flex-col justify-center items-center m-8 font-bold text-5xl">
              No artists found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
