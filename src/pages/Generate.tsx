import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  Wand2,
  Settings,
  ImageIcon,
  BookOpen,
  LayoutDashboard,
  History,
  PlusCircle,
  Sparkles,
  ChevronDown,
  Edit,
  Video,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import GeneratedImage from '@/components/GeneratedImage'; // Assuming this component exists for displaying images
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card'; // Import Card component

// API keys have been removed for security and should be stored on a backend server.
// Removed unused sensitive keys:
// const OPENAI_API_KEY = "...";
// const HF_API_TOKEN = "...";
// const GEMINI_API_KEY = "...";
// const MONSTER_API_KEY = "...";

// Dummy data for sidebar navigation (replace with actual routing later)
const sidebarNavItems = [
  { icon: <Sparkles className="w-5 h-5" />, label: 'AI Image Generation', href: '#' },
  { icon: <ImageIcon className="w-5 h-5" />, label: 'AI Canvas', href: '#' },

  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Community Feed', href: '#' },
  { icon: <History className="w-5 h-5" />, label: 'Personal Feed', href: '#' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '#' },
];

// Dummy data for generated images (replace with actual generated images)
const dummyImages = [
  { id: 1, prompt: 'A futuristic city at sunset', style: 'digital-art', aspectRatio: '1:1', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPO3kODNAGvhQrybNLW3ovYOr15cnXMI1mWivd79f80mDtDYbQsR4E9wCr3uydxloU-a8&usqp=CAU', timestamp: new Date() },
  { id: 2, prompt: 'A whimsical forest with glowing mushrooms', style: 'fantasy', aspectRatio: '3:4', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfXPs-SNBPDxec6h52i6E2fQmlRaer5q3uA&s', timestamp: new Date() },
  { id: 3, prompt: 'Portrait of middle age man', style: 'oil-painting', aspectRatio: '4:3', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShG2CR2zYHbs_F89FzgTTFNbdsml3EsWFkJqmsjf6aJC1ML9UgY7f46JMRBCEXSVF9aX4&usqp=CAU', timestamp: new Date() },
  { id: 4, prompt: 'A girl sitting on moon', style: 'abstract', aspectRatio: '1:1', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2cvbjLHPOOkU3ElKM5v_J7c5wcrjzROGaCg&s', timestamp: new Date() },
  { id: 5, prompt: 'A lone tree on a hill under a starry sky', style: 'photorealistic', aspectRatio: '16:9', url: 'https://img.freepik.com/free-photo/landscape-with-night-starry-sky-silhouette-tree-hill-milky-way-with-lonely-tree-falling-stars_146671-14048.jpg', timestamp: new Date() },
  { id: 6, prompt: 'A futuristic underwater city', style: 'digital-art', aspectRatio: '1:1', url: 'https://img.freepik.com/premium-photo/3d-model-futuristic-underwater-city-with-glowing-marine-life-3d-render_1022944-15939.jpg', timestamp: new Date() },
  { id: 7, prompt: 'A mystical dragon in a dark forest', style: 'fantasy', aspectRatio: '3:4', url: 'https://images2.alphacoders.com/533/thumb-1920-533704.jpg', timestamp: new Date() },
  { id: 8, prompt: 'A portrait of a young woman', style: 'oil-painting', aspectRatio: '4:3', url: 'https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?semt=ais_hybrid&w=740', timestamp: new Date() },
  { id: 9, prompt: 'A vibrant cityscape at night', style: 'photorealistic', aspectRatio: '16:9', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Efc7aW7yWLARh13ySZa1iSufNMIHCKi8nQ&s', timestamp: new Date() },
  { id: 10, prompt: 'A serene mountain landscape', style: 'photorealistic', aspectRatio: '16:9', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHenLYdMcsTD_KSl8GbO6VQfqM6YUtrj-llp40NG9LRo3J22SKUUiJAijcNjlyToGL7g&usqp=CAU', timestamp: new Date() },
];

// Define the different creative actions
const creativeActions = [
  { id: 'create-image', name: 'Image', description: 'Create stunning AI-generated images', icon: <ImageIcon className="w-6 h-6" /> },
  { id: 'edit-image', name: 'Edit Image', description: 'Modify and enhance existing images', icon: <Edit className="w-6 h-6" /> },
  { id: 'storytelling', name: 'Storytelling', description: 'Bring your stories to life', icon: <BookOpen className="w-6 h-6" /> },
  { id: 'consistent-character', name: 'Consistent Character', description: 'Generate images with consistent characters', icon: <Users className="w-6 h-6" /> },
  { id: 'image-to-video', name: 'Image to Video', description: 'Animate your images', icon: <Video className="w-6 h-6" /> },
];

// Available AI Models - Removed as per user request
// const aiModels = [
//   { id: 'dall-e-3', name: 'DALL·E 3 (OpenAI)' },
//   { id: 'stable-diffusion', name: 'Stable Diffusion (Hugging Face)' },
//   { id: 'monster-api-sdxl', name: 'SDXL (MonsterAPI)' }, // Added MonsterAPI SDXL
//   // Gemini models are not typically used for text-to-image generation from text prompts
// ];

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState('vivid');
  // const [selectedModel, setSelectedModel] = useState('dall-e-3'); // Removed as per user request
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState(dummyImages);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('create-image');
  const [generatingImageId, setGeneratingImageId] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const tempImageId = Date.now();
    setGeneratingImageId(tempImageId);

    // Add a temporary loading image
    const tempImage = {
      id: tempImageId,
      prompt: prompt,
      style: style,
      aspectRatio: size.split('x').join(':'),
      url: 'https://via.placeholder.com/400?text=Generating...', // Placeholder while generating
      timestamp: new Date(),
      // model: selectedModel, // Removed as per user request
      isLoading: true,
      error: undefined, // Ensure error is undefined for new generations
    };

    setGeneratedImages(currentImages => [tempImage, ...currentImages]);

    try {
      // Call backend endpoint for image generation
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          negativePrompt: negativePrompt,
          size: size,
          style: style,
          // model: selectedModel, // Removed as per user request
        }),
      });

      if (!response.ok) {
        // Attempt to get a meaningful error message from the response body
        let errorMessage = `Generation failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === 'string') {
             errorMessage = errorData;
          }
        } catch (jsonError) {
          console.error('Failed to parse error response as JSON:', jsonError);
          // If JSON parsing fails, the default message with status is used
        }
        throw new Error(errorMessage);
      }

      // Receive binary data (image blob)
      const blob = await response.blob();

      // Create image URL from Blob
      const imageUrl = URL.createObjectURL(blob);

      // Update the temporary image with the real one
      setGeneratedImages(currentImages =>
        currentImages.map(img =>
          img.id === tempImageId
            ? { ...img, url: imageUrl, isLoading: false, error: undefined }
            : img
        )
      );

      toast({
        title: "Success",
        description: "Image generated successfully!",
      });

      setPrompt('');
      setNegativePrompt('');

    } catch (error) {
      console.error('Generation error:', error);

      // Update the temporary image to show error
      setGeneratedImages(currentImages =>
        currentImages.map(img =>
          img.id === tempImageId
            ? {
                ...img,
                url: 'https://via.placeholder.com/400?text=Generation+Failed',
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to generate image'
              }
            : img
        )
      );

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGeneratingImageId(null);
    }
  };

  // Helper to render settings
  const renderModelSettings = () => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <Label htmlFor="negative-prompt" className="block text-sm font-medium text-gray-400 mb-2">
               Negative Prompt (Optional)
             </Label>
             <Textarea
               id="negative-prompt"
               value={negativePrompt}
               onChange={(e) => setNegativePrompt(e.target.value)}
               placeholder="Avoid blurry, distorted, ugly..."
               className="min-h-[60px] bg-gray-800 border-gray-700 text-white placeholder-gray-600 focus:border-purple-600 focus:ring-purple-600"
             />
           </div>
           <div>
             <Label htmlFor="size" className="block text-sm font-medium text-gray-400 mb-2">
               Size
             </Label>
             <Select value={size} onValueChange={setSize}>
               <SelectTrigger id="size" className="bg-gray-800 border-gray-700 text-white focus:border-purple-600 focus:ring-purple-600">
                 <SelectValue placeholder="Select size" />
               </SelectTrigger>
               <SelectContent className="bg-gray-800 border-gray-700 text-white">
                 <SelectItem value="1024x1024">1:1 Square</SelectItem>
                 <SelectItem value="1024x1792">9:16 Vertical</SelectItem>
                 <SelectItem value="1792x1024">16:9 Horizontal</SelectItem>
               </SelectContent>
             </Select>
           </div>
           {/* Keep style selection */}
           <div>
             <Label htmlFor="style" className="block text-sm font-medium text-gray-400 mb-2">
               Style
             </Label>
             <Select value={style} onValueChange={setStyle}>
               <SelectTrigger id="style" className="bg-gray-800 border-gray-700 text-white focus:border-purple-600 focus:ring-purple-600">
                 <SelectValue placeholder="Select style" />
               </SelectTrigger>
               <SelectContent className="bg-gray-800 border-gray-700 text-white">
                 <SelectItem value="vivid">Vivid</SelectItem>
                 <SelectItem value="natural">Natural</SelectItem>
               </SelectContent>
             </Select>
           </div>
           {/* Add more relevant settings here */}
        </div>
      );
  };


  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-300">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-4">
        <div className="p-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">MAYA</span>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        {/* You can add user info or settings toggle here */}
      </div>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Action Selection Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 border-b border-gray-800 p-6"
        >
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">What would you like to create?</h2>

            {/* Action Selection Buttons/Cards */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {creativeActions.map((action) => (
                <Card
                  key={action.id}
                  className={`min-w-[200px] p-4 cursor-pointer transition-all duration-300 ${selectedAction === action.id ? 'border-purple-600 bg-gray-800' : 'border-gray-700 bg-gray-800/50 hover:border-purple-600'}`}
                  onClick={() => setSelectedAction(action.id)}
                >
                   <div className="flex items-center space-x-3 mb-2">
                      {action.icon}
                      <h3 className="text-lg font-semibold text-white">{action.name}</h3>
                   </div>
                   <p className="text-sm text-gray-400">{action.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dynamic Content Area based on selectedAction */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
             {selectedAction === 'create-image' && (
                 <motion.div
                    key="create-image-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                 >
                   {/* Image Generation Form */}
                    <div className="max-w-screen-xl mx-auto">

                      {/* Model Selection - Removed as per user request */}
                      {/* <div className="mb-6">
                        <Label htmlFor="model" className="block text-sm font-medium text-gray-400 mb-2">
                           Choose AI Model
                        </Label>
                         <Select value={selectedModel} onValueChange={setSelectedModel}>
                           <SelectTrigger id="model" className="bg-gray-800 border-gray-700 text-white focus:border-purple-600 focus:ring-purple-600">
                             <SelectValue placeholder="Select model" />
                           </SelectTrigger>
                           <SelectContent className="bg-gray-800 border-gray-700 text-white">
                             {aiModels.map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                      </div> */}

                      {/* Prompt and Settings Area */}
                      <div className="mb-6 space-y-4">
                        <div>
                          <Label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
                            Describe your image
                          </Label>
                          <Textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="A serene landscape with mountains and a lake at sunset..."
                            className="min-h-[80px] bg-gray-800 border-gray-700 text-white placeholder-gray-600 focus:border-purple-600 focus:ring-purple-600"
                          />
                        </div>

                        {/* More Options/Settings */}
                        <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="flex items-center justify-between w-full px-0 hover:bg-transparent">
                              <h4 className="text-lg font-semibold text-white">Settings</h4>
                              <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4 pt-4 border-t border-gray-800 mt-4">
                            {renderModelSettings()} {/* Render settings */}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      {/* Generate Button */}
                      <Button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 px-6 text-md font-semibold rounded-md transition-all duration-300"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>

                      {/* Generated Images Grid */}
                        <div className="mt-8">
                          <h3 className="text-xl font-bold text-white mb-6">Your Generations</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center justify-center bg-gray-800 rounded-xl border border-gray-700 aspect-square cursor-pointer hover:border-purple-600 transition-colors duration-200"
                                onClick={() => setSelectedAction('create-image')}
                              >
                                <div className="text-center text-gray-400">
                                  <PlusCircle className="w-8 h-8 mx-auto mb-2" />
                                  Create New
                                </div>
                              </motion.div>

                              {generatedImages.map((image) => (
                                <GeneratedImage key={image.id} image={image} />
                              ))}
                            </div>
                        </div>
                    </div>
                 </motion.div>
             )}
             {/* Placeholder for other actions */}
              {selectedAction !== 'create-image' && (
                  <motion.div
                      key="other-actions-placeholder"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 text-center text-gray-500"
                  >
                     <div className="max-w-screen-xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">{creativeActions.find(action => action.id === selectedAction)?.name}</h3>
                        <p>Content for {creativeActions.find(action => action.id === selectedAction)?.name} is coming soon!</p>
                     </div>
                  </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Generate;