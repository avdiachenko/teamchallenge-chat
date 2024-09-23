import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path";
dotenv.config()



// Configuration
cloudinary.config({ 
  cloud_name: 'dtonpxhk7', 
  api_key: '325515328154224', 
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
    
// Upload an image
export const uploadToCloudinary = async (folder, name) => {
    const image = await cloudinary.uploader
        .upload(
            path.join(folder, name), {
                public_id: name,
            }
        )
        .catch((error) => {
            console.log(error);
        });

    // const optimizeUrl = cloudinary.url(name, {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    return image.url;
}
