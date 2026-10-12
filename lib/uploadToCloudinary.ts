import { v2 as cloudinary } from 'cloudinary';

// upload single image to cloudinary
export async function uploadToCloudinary(
  file: File,
  folderName: string = "products",
  customFileName?: string,
): Promise<string | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);
  formData.append("folder", folderName);

  if (customFileName) {
    formData.append("public_id", customFileName);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}



// upload single image to cloudinary
export async function upCloudinarySingle(file:any, folderName:string, imageName:string) {
  cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folderName,
      public_id: imageName, // এটি ইমেজের কাস্টম নাম সেট করবে
      overwrite: true, // একই নামের ছবি থাকলে রিপ্লেস করবে (ঐচ্ছিক)
    });
    
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading single image:", error);
    throw new Error("Failed to upload image");
  }
}

// upload multiple images to cloudinary
export async function upCloudinaryMultiple(imageFilesData:{ file: any; name: string }[], folderName:string) {
  try {
      cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});
    // imageFilesData হবে এমন: [{ file: '...', folder: '...', name: '...' }]
    const uploadPromises = imageFilesData.map((img) => {
      return cloudinary.uploader.upload(img.file, { 
        folder: folderName,
        public_id: img.name
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);
    
    return imageUrls; 

  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error("Failed to upload images");
  }
}