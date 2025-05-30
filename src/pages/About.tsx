import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">MAYA</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          MAYA is your gateway to effortless AI-powered creative expression.
          Transform your ideas into stunning visuals with cutting-edge artificial intelligence.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Our mission is to democratize creativity, making advanced AI tools accessible to everyone.
          Whether you're an artist, designer, writer, or just curious, MAYA provides the tools
          to bring your imagination to life without needing complex software or technical skills.
          Explore the possibilities and create something amazing today.
        </p>
      </motion.div>
    </div>
  );
};

export default About; 