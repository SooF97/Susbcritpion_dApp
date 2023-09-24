"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Web3Button } from "@web3modal/react";

import { useAccount, useConnect, useDisconnect } from "wagmi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/">
            <span className="text-lime-300">Connect</span>ify
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <div className="flex flex-row items-center justify-center gap-6">
            <NavItem icon={<FaHome />} text="Home" path="/" />

            <NavItem icon={<FaInfoCircle />} text="About" path="/about" />

            <NavItem icon={<FaUsers />} text="Team" path="/team" />

            <NavItem icon={<FaEnvelope />} text="Contact" path="/contact" />
          </div>

          {/* <button className="cta" onClick={() => open()}>
            <span>Sign in</span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                strokeWidth="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </button> */}
          <Web3Button balance="show" />
        </div>

        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            <FaBars className="text-3xl" />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && <MobileMenu onClose={toggleNavbar} />}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, text, path }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center cursor-pointer hover:text-lime-300"
    >
      {icon}
      <Link href={`${path}`}>
        <span className="ml-2 hover:text-lime-300">{text}</span>
      </Link>
    </motion.div>
  );
};

const MobileMenu = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed top-0 left-0 w-full h-screen bg-gray-900 text-white p-4"
    >
      <div className="flex justify-end">
        <button onClick={onClose}>
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <div className="mt-8 space-y-4 ml-4">
        <NavItem icon={<FaHome />} text="Home" path="/" />

        <NavItem icon={<FaInfoCircle />} text="About" path="/about" />

        <NavItem icon={<FaUsers />} text="Team" path="/team" />

        <NavItem icon={<FaEnvelope />} text="Contact" path="/contact" />
        <div className="mt-2">
          <Web3Button balance="show" />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
