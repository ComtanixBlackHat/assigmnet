// posts.service.js

// Assume you have axios installed as your HTTP client
import axios from 'axios';

// Function to submit a GET request to the /feed endpoint
export const getFeed = async () => {
  try {
    const response = await axios.get('/feed'); // Adjust the URL accordingly
    return response.data;
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};

// Export the function
export default {
  getFeed,
};
