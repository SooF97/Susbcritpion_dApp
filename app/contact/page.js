"use client";
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-8"
        >
          Contact Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ContactCard
            icon={<FaMapMarkerAlt className="text-blue-600 text-3xl mb-4" />}
            title="Location"
            info="123 Ain Sebaa, Casablanca, Morocco"
          />
          <ContactCard
            icon={<FaPhone className="text-blue-600 text-3xl mb-4" />}
            title="Phone"
            info="+1 123-456-7890"
          />
          <ContactCard
            icon={<FaEnvelope className="text-blue-600 text-3xl mb-4" />}
            title="Email"
            info="info@example.com"
          />
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, info }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 m-4 rounded-lg shadow-lg text-center"
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{info}</p>
    </motion.div>
  );
};

export default Contact;
