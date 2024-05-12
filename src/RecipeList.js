import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes } from './apiService';
import Search from './Search'; 

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesData = await getAllRecipes();
      setRecipes(recipesData);
      setFilteredRecipes(recipesData); // Initialize filtered recipes with all recipes
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>

      {/* Render the Search component */}
      <Search recipes={recipes} setFilteredRecipes={setFilteredRecipes} />

      {/* Display the recipe list based on filtered recipes */}
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id} className="image-container" >
            <Link to={`/recipe/${recipe.id}`} >
              <strong>{recipe.name}</strong> - ${recipe.price}
              <br />
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;