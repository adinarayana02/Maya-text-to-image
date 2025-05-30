
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Palette, Shield, Cloud, Smartphone, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate high-quality images in seconds with our optimized AI models.'
    },
    {
      icon: Palette,
      title: 'Multiple Styles',
      description: 'Choose from photorealistic, anime, 3D, and artistic styles.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your data is protected with enterprise-grade security.'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'All your creations are safely stored and accessible anywhere.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Create amazing images on any device, anywhere.'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Share and discover incredible AI art from creators worldwide.'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Dreamify</span>?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Powerful features designed to unleash your creativity and bring your imagination to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
