import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Home from './components/Home'; // Ensure correct path

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} /> {/* Use Home component here */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
