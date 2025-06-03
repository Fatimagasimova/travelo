import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
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
        <Route path="/travelo" element={<Home />} />
        <Route path="/travelo/explore" element={<Explore />} />
        <Route path="/travelo/cityguide/:name" element={<CityGuide />} />
        <Route path="/travelo/planner" element={<Planner markers={markers} setMarkers={setMarkers} />} />
        <Route path="/travelo/map" element={<Map markers={markers} />} />
<Route path="/travelo/cityguide" element={<CityGuide />} />
        <Route path="/travelo/reviews" element={<Reviews />}  />
        

<Route
          path="/travelo/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/travelo/profile"
          element={<Profile loggedInUser={loggedInUser} onLogout={handleLogout} />}
        /> 
        <Route path="*" element={<Navigate to="/travelo" />} />   
      </Routes>
      
    </Router>
    
  );
}

export default App;
