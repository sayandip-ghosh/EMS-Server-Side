import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async function () {
    const connection = cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary configuration initialized");
};

connectCloudinary()
    .then(() => {
        console.log("Cloudinary connected successfully");
    })
    .catch((error) => {
        console.log("Cloudinary connection failed", error);
    });

const uploadOnCloudinary = async (base64String) => {
    try {
        if (!base64String) return null;

        // Upload the Base64 string to Cloudinary
        const response = await cloudinary.uploader.upload(base64String, {
            resource_type: "auto", // Automatically detect the file type
        });

        // File has been uploaded successfully
        console.log("File uploaded to Cloudinary:", response.url);
        return response;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary };