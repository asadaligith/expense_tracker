import axios from "axios";
import { BASE_URL } from "./apiPath"; // Assuming this is the file from the previous request

// --- 1. Creating the Axios Instance ---
const axiosInstance = axios.create({
    // Sets the base URL for all requests made using this instance
    baseURL: BASE_URL,
    
    // Sets a timeout of 10 seconds (10,000 milliseconds) for requests
    timeout: 10000,
    
    // Defines default headers for all requests
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// --- 2. Request Interceptor ---
// The interceptor runs before every request is sent.
axiosInstance.interceptors.request.use(
    // Success handler: Modifies the request configuration
    (config) => {
        // Tries to retrieve the authentication token from local storage
        const accessToken = localStorage.getItem("token");

        // If a token exists, add it to the Authorization header
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        // Return the (potentially modified) configuration
        return config;
    },
    
    // Error handler: Handles any error during the request setup
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor
// The interceptor runs after every response is received.
axiosInstance.interceptors.response.use(
    // Success Handler: Runs if the request gets a 2xx status code
    (response) => {
        // Just return the successful response data
        return response;
    },

    // Error Handler: Runs if the request encounters an error (network error or non-2xx status code)
    (error) => {
        // Handle common errors globally

        // Check if the error object contains a response from the server (i.e., not a network error)
        if (error.response) {
            
            // --- 401 Unauthorized Handling ---
            if (error.response.status === 401) {
                // Redirect to login page for unauthorized access/expired token
                console.warn("Unauthorized (401): Token may be expired or missing.");
            } 
            // --- 500 Server Error Handling ---
            else if (error.response.status === 500) {
                // Log a generic server error message
                console.error("Server error. Please try again later.");
            }
        } 
        // --- Request Timeout Handling ---
        else if (error.code === "ECONNABORTED") {
            // Check for the specific Axios code for request timeout
            console.error("Request timeout. Please try again.");
        }

        // Must reject the promise so that the component calling the API can catch the error
        return Promise.reject(error);
    }
);

export default axiosInstance;