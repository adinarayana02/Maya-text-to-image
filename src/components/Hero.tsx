import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import videoSource from '@/assets/images/text-to-image-4-3-v2.webm';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToGenerate = () => {
    document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartCreatingClick = () => {
    navigate('/generate');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://khirki.in/cdn/shop/files/Artboard1_2aeb2f32-d1b5-42c4-a2c5-ee6da8817b56.jpg?v=1740547239" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-cyan-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-700/50">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Powered by Advanced AI Models</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
              Words
            </span>{' '}
            into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Art
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Create stunning, unique images from simple text descriptions using cutting-edge AI technology. 
            Bring your imagination to life with MAYA.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-16">
            <Button
              onClick={handleStartCreatingClick}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Free
            </Button>
            
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              View Gallery
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div className="text-left">
              <div className="text-3xl font-bold text-white mb-2">10M+</div>
              <div className="text-gray-400">Images Generated</div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-white mb-2">500K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Video */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full max-w-2xl"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={videoSource} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToGenerate}
          className="text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
