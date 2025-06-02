import React, { useState } from "react";
import "./MobileAuth.css";
import { useNavigate } from "react-router-dom";

export default function MobileAuth({ onLogin }) {
  const navigate = useNavigate();
    const [active, setActive] = useState(false); // false = login, true = register
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({
      username: "",
      email: "",
      password: "",
    });
  
  
    const [loggedInUser, setLoggedInUser] = useState(() => {
    // LocalStorage-dan əvvəlcədən daxil olan istifadəçini yüklə (əgər varsa)
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
    // Handle input change
    const handleLoginChange = (e) => {
      setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleRegisterChange = (e) => {
      setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    // Simple email validation
    const validateEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    };
  
    const [showPassword, setShowPassword] = useState(false);
  
  
    // Register user and save to localStorage
    const handleRegisterSubmit = (e) => {
      e.preventDefault();
      const { username, email, password } = registerData;
  
      if (!username || !email || !password) {
        alert("Please fill all fields.");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }
      if (password.length < 6) {
        alert("Password should be at least 6 characters.");
        return;
      }
  
      // Get users from localStorage or empty array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
  
      // Check if username already exists
      if (users.some(user => user.username === username)) {
        alert("Username already taken.");
        return;
      }
  
      // Save new user
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("Registration successful! You can now login.");
      setRegisterData({ username: "", email: "", password: "" });
      setActive(false); // switch to login
    };
  
    // Login user by checking localStorage
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const { username, password } = loginData;
  
      if (!username || !password) {
        alert("Please fill all fields.");
        return;
      }
  
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        alert(`Welcome back, ${user.username}!`);
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // ƏLAVƏ ET
        onLogin(user);  // burada artıq onLogin var və işləyəcək
        navigate("/profile");
      } else {
        alert("Invalid username or password.");
      }
    };

  return (
    <div className="auth-container2">
      <h1 className="welcome">Welcome</h1>
      <div className="auth-box">
        <div className="auth-toggle">
          <button
            className={active === "login" ? "active" : ""}
            onClick={() => setActive("login")}
          >
            Login
          </button>
          <button
            className={active === "register" ? "active" : ""}
            onClick={() => setActive("register")}
          >
            Register
          </button>
        </div>

        {active === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="username"
              className="mobile-input"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
            <div className="password-container">
              <input
              className="mobile-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <button className="btnauth" type="submit">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/facebook--v1.png" alt="facebook" /></a>
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/google-logo--v1.png" alt="google" /></a>
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github" /></a>
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/linkedin.png" alt="linkedin" /></a>
            </div>            
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <input
              className="mobile-input"
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <input
            className="mobile-input"
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <div className="password-container">
              <input
              className="mobile-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <button className="btnauth" type="submit">Register</button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/facebook--v1.png" alt="facebook" /></a>
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/google-logo--v1.png" alt="google" /></a>
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github" /></a>
              <a href="#"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/linkedin.png" alt="linkedin" /></a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
