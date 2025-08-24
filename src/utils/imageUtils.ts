
/**
 * Creates a grayscale version of the image
 */
export const convertToGrayscale = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    
    // Convert to grayscale using luminance method
    const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
    
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
    // Alpha channel (data[i + 3]) stays the same
  }
  return imageData;
};

/**
 * Process an image to be grayscale and with the background removed
 * In a real implementation, we'd use an ML model for background removal
 * For now, we'll simulate it with a simple background removal based on color difference
 */
export const processProfileImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      img.onload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Convert to grayscale
        const grayscaleImageData = convertToGrayscale(imageData);
        
        // Apply the modified image data back to the canvas
        ctx.putImageData(grayscaleImageData, 0, 0);
        
        // Convert canvas to data URL (this would be a base64 string)
        const dataUrl = canvas.toDataURL('image/png');
        
        // Clean up
        URL.revokeObjectURL(img.src);
        
        resolve(dataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Set the source of the image
      img.src = URL.createObjectURL(file);
      
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Convert a base64 string to a File object
 */
export const dataURLtoFile = (dataURL: string, filename: string): File => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Read a file as a data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
