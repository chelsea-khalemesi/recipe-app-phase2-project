import axios from 'axios';

const baseUrl = 'http://localhost:3000';

// Fetch all recipes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};