import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Challenges from './pages/Challenges';
import Stats from './pages/Stats';
import CalendarView from './pages/CalendarView';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-gray-900 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
