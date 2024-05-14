import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from './apiService';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);

        if (!recipeData) {
          throw new Error('Recipe not found');
        }

        // Fetch reviews associated with the selected recipe (if available)
        const recipeWithReviews = {
          ...recipeData,
          reviews: recipeData.reviews || []
        };

        setRecipe(recipeWithReviews);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setRecipe(null);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Price: ${recipe.price}</p>
      <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '300px' }} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Preparation:</h3>
      <ol>
        {recipe.preparation.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <h3>Reviews:</h3>
      <ul>
        {recipe.reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.username}</strong> - Rating: {review.rating}<br />
            {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetail;