import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Home from './components/Home'; 
import Output from './components/Output';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/output" element={<Output />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
