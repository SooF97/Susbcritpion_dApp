"use client";
import React from "react";
import { FaUser, FaRegEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      email: "john@example.com",
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      email: "jane@example.com",
    },
    {
      name: "Alice Johnson",
      role: "Designer",
      email: "alice@example.com",
    },
    {
      name: "Bob Wilson",
      role: "Marketing Manager",
      email: "bob@example.com",
    },
  ];

  return (
    <div className=" py-16">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-8"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ name, role, email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 m-4 rounded-lg shadow-lg text-center"
    >
      <FaUser className="text-blue-600 text-3xl mb-4" />
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-600">{role}</p>
      <p className="text-gray-600 mt-2">
        <a href={`mailto:${email}`} className="hover:text-blue-600">
          <FaRegEnvelope className="inline-block mr-1" />
          {email}
        </a>
      </p>
    </motion.div>
  );
};

export default Team;
