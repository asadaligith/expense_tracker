import { API_PATHS } from './apiPath'; // Import the path constants
import axiosInstance from './axiosinstance'; // Import the configured Axios instance

// Function to handle image upload to the server
const uploadImage = async (imageFile) => {
    // 1. Create FormData object
    const formData = new FormData();
    // Append the image file to the form data with the key 'image' 
    // (This must match the key your backend expects)
    formData.append('image', imageFile); 

    try {
        // 2. Perform the POST request using the configured axiosInstance
        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE, // The dedicated image upload endpoint
            formData,
            {
                // Crucially, set the Content-Type header to multipart/form-data
                // Note: Axios often handles this automatically when a FormData object is passed,
                // but explicitly setting it (or letting Axios handle it) is required for file uploads.
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            }
        );
        
        // 3. Return the data from the server (e.g., the URL of the uploaded image)
        return response.data; 
    } catch (error) {
        // 4. Log the error and rethrow it so the calling function (like handleSignUp) 
        // can handle UI-specific error messages.
        console.error('Error uploading the image:', error);
        throw error; 
    }
};

export default uploadImage;