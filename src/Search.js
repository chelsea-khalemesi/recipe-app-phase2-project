import React, { useState } from 'react';

function Search({ recipes, setFilteredRecipes }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    // Filter recipes based on the search query
    const filtered = recipes.filter(recipe => {
      
      const nameMatch = recipe.name.toLowerCase().includes(query);
      const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query));
      return nameMatch || ingredientMatch;
    });

    setFilteredRecipes(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by recipe name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default Search;