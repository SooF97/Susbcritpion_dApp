"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className=" text-black  py-12">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold mb-4"
        >
          Discover Exclusive Music
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl mb-6"
        >
          For Artists and Fans
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg mb-8"
        >
          Join our platform to upload exclusive music and connect with your fans
          through monthly or yearly subscriptions.
        </motion.p>
        <div className="flex justify-center ">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white cta hover:bg-white text-lg font-semibold px-6 py-3 rounded-full shadow-md mr-4"
          >
            <Link href="/started">Get Started</Link>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-transparent border border-black text-lg font-semibold px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white"
          >
            <Link href="/explore">Explore</Link>
          </motion.button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Image
              src="/mainmain.png"
              alt="heroimage"
              width={400}
              height={400}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
