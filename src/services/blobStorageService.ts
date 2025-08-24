
import { put } from '@vercel/blob';

/**
 * Uploads an image to blob storage
 * @param file The file to upload
 * @param prefix Optional prefix for the file name
 * @returns The URL of the uploaded file
 */
export async function uploadImage(file: File, prefix: string = ''): Promise<string> {
  try {
    // Create a unique filename with the prefix
    const uniqueFilename = `${prefix}-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    // Upload to Vercel Blob
    const { url } = await put(uniqueFilename, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    
    return url;
  } catch (error) {
    console.error('Error uploading image to blob storage:', error);
    
    // Fallback to local URL if blob storage fails
    return URL.createObjectURL(file);
  }
}
