import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Welcome to My Recipe App</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/new" element={<RecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;