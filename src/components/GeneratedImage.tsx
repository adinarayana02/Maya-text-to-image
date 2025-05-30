import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Heart, Copy, X, Eye, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface GeneratedImageProps {
  image: {
    id: number;
    prompt: string;
    style: string;
    aspectRatio: string;
    url: string;
    timestamp: Date;
    isLoading?: boolean;
    error?: string;
  };
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ image }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (image.url && !image.isLoading) {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        setIsImageLoading(false);
        setImageError(false);
      };
      img.onerror = () => {
        setIsImageLoading(false);
        setImageError(true);
      };
    }
  }, [image.url, image.isLoading]);

  const handleDownload = async () => {
    if (image.isLoading || imageError) return;
    
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${image.id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: "Your image is being downloaded...",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (image.isLoading || imageError) return;
    
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Image link copied to clipboard!",
    });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    toast({
      title: "Prompt Copied",
      description: "Prompt copied to clipboard!",
    });
  };

  const getStyleColor = (style: string) => {
    const colors = {
      'photorealistic': 'bg-blue-500',
      'digital-art': 'bg-purple-500',
      '3d-render': 'bg-green-500',
      'anime': 'bg-pink-500',
      'oil-painting': 'bg-orange-500',
    };
    return colors[style as keyof typeof colors] || 'bg-gray-500';
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  const renderImageContent = () => {
    if (image.isLoading) {
      return (
        <div className="w-full h-64 flex items-center justify-center bg-gray-800">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          <span className="ml-2 text-gray-400">Generating...</span>
        </div>
      );
    }

    if (imageError || image.error) {
      return (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-800 p-4">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-red-500 text-center text-sm">
            {image.error || 'Failed to load image'}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 text-xs border-red-500/50 text-red-500 hover:bg-red-500/10"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (isImageLoading) {
      return (
        <div className="w-full h-64 flex items-center justify-center bg-gray-800">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          <span className="ml-2 text-gray-400">Loading image...</span>
        </div>
      );
    }

    return (
      <img
        src={image.url}
        alt={image.prompt}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        onError={handleImageError}
      />
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative overflow-hidden">
              {renderImageContent()}
              
              {/* Overlay on Hover */}
              {!image.isLoading && !imageError && !image.error && !isImageLoading && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleDownload}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleShare}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                    {image.prompt}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStyleColor(image.style)} text-white text-xs`}>
                      {image.style.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                      {image.aspectRatio}
                    </Badge>
                  </div>
                </div>
                
                {!image.isLoading && !imageError && !image.error && !isImageLoading && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{image.timestamp.toLocaleDateString()}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyPrompt}
                  className="p-1 h-auto text-gray-400 hover:text-white"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy prompt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal */}
      {!image.isLoading && !imageError && !image.error && !isImageLoading && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 p-0">
            <div className="relative">
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={handleImageError}
              />
              
              <Button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white mb-4">{image.prompt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Badge className={`${getStyleColor(image.style)} text-white`}>
                      {image.style.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-500">
                      {image.aspectRatio}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="border-gray-600 text-gray-300">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GeneratedImage;
