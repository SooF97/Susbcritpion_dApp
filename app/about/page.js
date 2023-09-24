"use client";
import React from "react";
import { FaMusic, FaMicrophone, FaHeadphones, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className=" py-16">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-8"
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaMusic className="text-blue-600 text-3xl mb-4" />}
            title="Exclusive Music"
            description="Artists can upload exclusive music tracks for their fans to enjoy."
          />
          <FeatureCard
            icon={<FaMicrophone className="text-blue-600 text-3xl mb-4" />}
            title="Artist Collaboration"
            description="Collaborate with other artists to create unique music experiences."
          />
          <FeatureCard
            icon={<FaHeadphones className="text-blue-600 text-3xl mb-4" />}
            title="Premium Listening"
            description="Users can subscribe for premium access to high-quality music."
          />
          <FeatureCard
            icon={<FaUsers className="text-blue-600 text-3xl mb-4" />}
            title="Community Engagement"
            description="Build a loyal fanbase and engage with your audience through our platform."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 m-6 rounded-lg shadow-lg text-center"
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
};

export default About;
