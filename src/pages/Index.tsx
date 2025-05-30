
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Image as ImageIcon, Wand2, Video, Palette, Upload, Download, Search, Grid, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import GeneratedImage from '@/components/GeneratedImage';
import LoadingAnimation from '@/components/LoadingAnimation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  const mainCreationOptions = [
    {
      title: "Image",
      description: "Create stunning AI-generated images",
      color: "from-blue-500 to-blue-600",
      icon: ImageIcon,
      actions: [
        { label: "+ Create Image", variant: "primary" },
        { label: "Edit Image", variant: "secondary" }
      ]
    },
    {
      title: "Storytelling",
      description: "Bring your stories to life",
      color: "from-yellow-500 to-orange-500",
      icon: Video,
      actions: [
        { label: "Consistent Character", variant: "primary" },
        { label: "Image to Video", variant: "secondary" }
      ]
    }
  ];

  const quickStarts = [
    {
      title: "Image to Video",
      description: "Bring your image to life",
      icon: Video,
      badge: "NEW",
      color: "text-green-400"
    },
    {
      title: "Choose a Style",
      description: "Start with a style you like",
      icon: Palette,
      color: "text-blue-400"
    },
    {
      title: "Explore Models",
      description: "See 100+ fine-tuned models",
      icon: Grid,
      color: "text-purple-400"
    },
    {
      title: "Train Model",
      description: "Customize your creativity",
      icon: Settings,
      color: "text-pink-400"
    },
    {
      title: "Ultimate Upscale",
      description: "Upgrade your images",
      icon: Upload,
      color: "text-yellow-400"
    },
    {
      title: "Image to Prompt",
      description: "Convert image to text prompt",
      icon: Search,
      color: "text-cyan-400"
    }
  ];

  const featuredApps = [
    {
      title: "Image to Video",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1635070040904-90a0f3a49be5?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Ultimate Upscale",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "AI Filters",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Sketch to Image",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Blend Board",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Change Facial Expression",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Expand",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Remove background",
      creator: "By OpenArt",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const models = [
    {
      title: "Train your own model",
      description: "Customize your creativity",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&crop=center",
      badge: "Premium"
    },
    {
      title: "OpenArt SDXL",
      creator: "OpenArt",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop&crop=center",
      badges: ["SDXL", "Standard"]
    },
    {
      title: "Flux (dev)",
      creator: "Flux Dev",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center",
      badges: ["Standard"]
    },
    {
      title: "Flux Realism",
      creator: "Flux",
      image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?w=300&h=200&fit=crop&crop=center",
      badges: ["Flux", "Photorealistic"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Main Creation Interface */}
      <section id="generate" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* What would you like to create? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              What would you like to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">create</span>?
            </h2>
            
            {/* Main Creation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {mainCreationOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${option.color} rounded-2xl p-8 text-white relative overflow-hidden h-64`}
                >
                  <div className="relative z-10">
                    <option.icon className="w-16 h-16 mb-4 opacity-80" />
                    <h3 className="text-3xl font-bold mb-2">{option.title}</h3>
                    <p className="text-white/80 mb-6">{option.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {option.actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant === "primary" ? "default" : "outline"}
                          className={action.variant === "primary" 
                            ? "bg-black/20 hover:bg-black/30 text-white border-0" 
                            : "border-white/30 text-white hover:bg-white/10"
                          }
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-2xl" />
                </motion.div>
              ))}
            </div>

            {/* Quick starts */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">Quick starts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickStarts.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${item.color} p-2 rounded-lg bg-gray-700/50`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      {item.badge && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Run
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Apps */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Featured Apps</h3>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  View All Flow Apps →
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredApps.map((app, index) => (
                  <motion.div
                    key={app.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 overflow-hidden">
                      <img 
                        src={app.image} 
                        alt={app.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{app.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{app.creator}</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Run
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Start from a model */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Start from a model</h3>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  View All Models →
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {models.map((model, index) => (
                  <motion.div
                    key={model.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 overflow-hidden relative">
                      <img 
                        src={model.image} 
                        alt={model.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {model.badge && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          🔒
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{model.title}</h4>
                      {model.creator && (
                        <p className="text-gray-400 text-sm mb-2">{model.creator}</p>
                      )}
                      {model.description && (
                        <p className="text-gray-400 text-sm mb-3">{model.description}</p>
                      )}
                      {model.badges && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {model.badges.map((badge, badgeIndex) => (
                            <Badge 
                              key={badgeIndex}
                              className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Create
                        </Button>
                        <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
                          Gallery
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Loading Animation */}
          {isGenerating && <LoadingAnimation />}

          {/* Generated Images Grid */}
          {generatedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {generatedImages.map((image) => (
                <GeneratedImage key={image.id} image={image} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
