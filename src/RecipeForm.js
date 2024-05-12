import React, { useState } from 'react';
import axios from 'axios';


function RecipeForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split ingredients and preparation into arrays
    const parsedIngredients = ingredients.split(',').map(item => item.trim());
    const parsedPreparation = preparation.split('\n').map(step => step.trim());

    const newRecipe = {
      name,
      price: parseFloat(price), // Convert price to a number
      image: imageUrl,
      ingredients: parsedIngredients,
      preparation: parsedPreparation
    };

    axios.post('http://localhost:3000/recipes', newRecipe)
      .then(response => {
        console.log('Recipe added successfully:', response.data);

         // Reset input fields after successful submission
         setName('');
         setPrice('');
         setImageUrl('');
         setIngredients('');
         setPreparation('');
        
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Price ($):
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Ingredients:
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Preparation:
          <textarea value={preparation} onChange={(e) => setPreparation(e.target.value)} rows="6" required style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
        </label>
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;