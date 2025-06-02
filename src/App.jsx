import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Home from './Home/Home.jsx';
import Explore from './Explore/Explore.jsx';   
import Map from './Map/Map.jsx';  
import Planner from './Planner/Planner.jsx'; 
import CityGuide from './CityGuide/CityGuide.jsx'; 
import Reviews from "./Reviews/Reviews.jsx";
import Login from "./Login/Login.jsx";
import Profile from "./Profile/Profile.jsx";

import "leaflet/dist/leaflet.css";

function App() {

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  // localStorage-dan ilkin state-i oxu, yoxdursa boş array qaytar
  const [markers, setMarkers] = useState(() => {
    const storedMarkers = localStorage.getItem("tripPlans");
    return storedMarkers ? JSON.parse(storedMarkers) : [];
  });

  // Markerlər dəyişdikcə localStorage-a yaz
  useEffect(() => {
    localStorage.setItem("tripPlans", JSON.stringify(markers));
  }, [markers]);


  return (
      <Router>
<Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cityguide/:name" element={<CityGuide />} />
        <Route path="/planner" element={<Planner markers={markers} setMarkers={setMarkers} />} />
        <Route path="/map" element={<Map markers={markers} />} />
<Route path="/cityguide" element={<CityGuide />} />
        <Route path="/reviews" element={<Reviews />}  />
        

<Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={<Profile loggedInUser={loggedInUser} onLogout={handleLogout} />}
        />    
      </Routes>
      
    </Router>
    
  );
}

export default App;
