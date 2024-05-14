import axios from 'axios';

const baseUrl = 'http://localhost:3000';

// Fetch all recipes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes'); // Throw an error to indicate fetch failure
  }
};

// Fetch a specific recipe by ID
export const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${baseUrl}/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${recipeId}:`, error);
    throw new Error(`Failed to fetch recipe with ID ${recipeId}`);
  }
};