import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllRecipes } from './apiService';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipesData = await getAllRecipes();
      const selectedRecipe = recipesData.find(r => r.id === parseInt(id));

      // Fetch reviews associated with the selected recipe
      const recipeWithReviews = {
        ...selectedRecipe,
        reviews: selectedRecipe.reviews || [] // Ensure reviews array exists
      };

      setRecipe(recipeWithReviews);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
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