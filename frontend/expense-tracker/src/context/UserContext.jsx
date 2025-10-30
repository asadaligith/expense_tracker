import React, { createContext, useState } from "react";

// 1. Create the Context object and export it
export const UserContext = createContext();

// 2. Define the Provider component
const UserProvider = ({ children }) => {
    // State to hold the user data (initialized to null)
    const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    };

    // Return the Provider, making the state and functions available to children
    return (
        <UserContext.Provider
            value={{
                user,          // The current user state
                updateUser,    // Function to set the user state
                clearUser,     // Function to clear the user state
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// You will likely need to export the Provider as well for use in your App.js file
export default UserProvider;