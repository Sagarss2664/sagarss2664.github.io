
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";
import { processProfileImage, readFileAsDataURL } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/services/blobStorageService";

interface ImageUploadProps {
  defaultImage: string;
  onImageChange: (imageData: string) => void;
  isProfile?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  defaultImage,
  onImageChange,
  isProfile = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);

      // Check if it's an image
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      let imageData: string;
      let blobUrl: string;

      if (isProfile) {
        // Process profile image (grayscale + background removal)
        imageData = await processProfileImage(file);
        
        // Create a new file from the processed image data
        const processedFile = await fetch(imageData)
          .then(res => res.blob())
          .then(blob => new File([blob], file.name, { type: file.type }));
        
        // Upload to Blob storage
        blobUrl = await uploadImage(processedFile, 'profile');
      } else {
        // Regular image processing and upload
        imageData = await readFileAsDataURL(file);
        blobUrl = await uploadImage(file, 'image');
      }

      // Update the preview with local data URL for immediate feedback
      setPreviewUrl(imageData);
      
      // But pass the blob URL to the parent for storage
      onImageChange(blobUrl);

      toast({
        title: "Image uploaded",
        description: "Your image has been processed and stored successfully",
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process or upload the image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {previewUrl ? (
        <div className="relative w-full h-64 overflow-hidden rounded-lg glass-card group">
          <img
            src={previewUrl}
            alt="Uploaded image"
            className={`w-full h-full object-cover transition-all duration-500 ${isProfile ? 'profile-image hover:scale-105' : 'group-hover:scale-110'}`}
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="sm"
              className="opacity-90 hover:opacity-100 bg-black/70 hover:bg-black/90"
              onClick={triggerFileInput}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Change"}
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
          onClick={triggerFileInput}
        >
          {isLoading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              <p className="text-sm text-muted-foreground">Processing image...</p>
            </div>
          ) : (
            <>
              <Image className="w-12 h-12 mb-2 text-muted-foreground animate-pulse" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload an image</p>
              <Button size="sm" disabled={isLoading} variant="outline" className="hover:bg-accent hover:text-white">
                <Upload className="w-4 h-4 mr-2" />
                Select Image
              </Button>
            </>
          )}
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isLoading}
      />
    </div>
  );
};

export default ImageUpload;
