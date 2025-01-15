import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user data is stored in localStorage or through an API
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // If user data exists in localStorage, set it
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Fetch user data from API or use default data
      fetchUserDataFromAPI();
    }
  }, []);

  const fetchUserDataFromAPI = async () => {
    try {
      const response = await fetch("/api/getUser"); // Replace with your API endpoint
      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // Optionally persist the user data in localStorage
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return user;
};

export default useUser;
