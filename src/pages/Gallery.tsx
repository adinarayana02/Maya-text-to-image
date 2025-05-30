
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Download, Share2, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GeneratedImage from '@/components/GeneratedImage';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('all');

  // Mock gallery data
  const galleryImages = [
    {
      id: 1,
      prompt: 'A mystical forest with glowing mushrooms and ethereal light',
      style: 'digital-art',
      aspectRatio: '16:9',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      timestamp: new Date('2024-01-15'),
      likes: 234,
      downloads: 45
    },
    {
      id: 2,
      prompt: 'Cyberpunk city at night with neon lights and flying cars',
      style: '3d-render',
      aspectRatio: '1:1',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop',
      timestamp: new Date('2024-01-14'),
      likes: 189,
      downloads: 67
    },
    {
      id: 3,
      prompt: 'Majestic dragon soaring through storm clouds',
      style: 'oil-painting',
      aspectRatio: '9:16',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      timestamp: new Date('2024-01-13'),
      likes: 156,
      downloads: 23
    },
    {
      id: 4,
      prompt: 'Serene Japanese garden with cherry blossoms',
      style: 'photorealistic',
      aspectRatio: '4:3',
      url: 'https://images.unsplash.com/photo-1490375340947-d05b2e08c657?w=600&h=450&fit=crop',
      timestamp: new Date('2024-01-12'),
      likes: 298,
      downloads: 89
    },
    {
      id: 5,
      prompt: 'Anime character with magical powers in battle pose',
      style: 'anime',
      aspectRatio: '1:1',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      timestamp: new Date('2024-01-11'),
      likes: 445,
      downloads: 123
    },
    {
      id: 6,
      prompt: 'Abstract geometric patterns in vibrant colors',
      style: 'digital-art',
      aspectRatio: '16:9',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      timestamp: new Date('2024-01-10'),
      likes: 167,
      downloads: 34
    }
  ];

  const trendingPrompts = [
    'Cyberpunk cityscape with neon lights',
    'Magical fantasy landscape',
    'Cute anime character portrait',
    'Abstract art with vibrant colors',
    'Photorealistic nature scene',
    'Futuristic robot design'
  ];

  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = selectedStyle === 'all' || image.style === selectedStyle;
    return matchesSearch && matchesStyle;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Amazing Creations</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore stunning AI-generated images from our creative community
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by prompt or style..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 h-12"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger className="w-48 bg-gray-900/50 border-gray-600 text-white h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by style" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="photorealistic">Photorealistic</SelectItem>
                    <SelectItem value="digital-art">Digital Art</SelectItem>
                    <SelectItem value="3d-render">3D Render</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="oil-painting">Oil Painting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="featured" className="mb-8">
            <TabsList className="bg-gray-800/50 border-gray-700">
              <TabsTrigger value="featured" className="data-[state=active]:bg-purple-600">
                Featured
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-purple-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-purple-600">
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GeneratedImage image={image} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="trending" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages
                  .sort((a, b) => b.likes - a.likes)
                  .map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <GeneratedImage image={image} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <GeneratedImage image={image} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Trending Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
              Trending Prompts
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingPrompts.map((prompt, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white cursor-pointer transition-colors duration-200"
                  onClick={() => setSearchQuery(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Gallery;
