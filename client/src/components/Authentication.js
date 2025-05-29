import React, { useEffect, useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Authentication.css';
import apiRequest from '../apiRequest';

const Authentication = ({ API_USER, isAuthenticated, setIsAuthenticated }) => {
  const reqAPI = `${API_USER}/Users`;
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const From = location.state?.from;
  const [User, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async () => {
    const PostOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(User)
    };

    try {
      const result = await apiRequest(reqAPI, PostOption);
      if (result.error) {
        alert(result.data.message || 'Sign up Failed');
      } else {
        setIsAuthenticated(true)
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data));
        console.log(result.data.token);
        setUser({ name: '', email: '', password: '', address: '' });
        alert(result.data.message);
        if (From === '/reset-password') {
      navigate('/');
    } else {
      navigate(-1);
    }
      }
    } catch (err) {
      console.error("User error: ", err);
    }
  };

const handleLogin = async () => {
  const loginOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: User.email,
      password: User.password
    })
  };

  try {
     const result = await apiRequest(`${API_USER}/login`, loginOptions);
    
    if (result.error) {
      alert(`${result.data.message}`);
    } else {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data));
      console.log(result.data.token);
      setIsAuthenticated(true);
      if (From === '/reset-password') {
        navigate('/');
      }
      else {
        navigate(-1);
      }
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};
  
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  console.log("storedUser:", storedUser); // <== log this

  if (storedUser && token) {
    try {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to parse storedUser:", error);
      localStorage.removeItem("user"); // clean bad data
    }
  }
}, [setIsAuthenticated]);

  return (
    isAuthenticated ? (
      <div className="logout-container">
        <h2>You are logged in</h2>
        <button
          className="login__button"
          onClick={() => {
            setIsAuthenticated(false);
            setUser({ name: '', email: '', password: '', address: '' });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
      </div>
    ) : (
    <div className="login">
      <div className="login__form">
        <h1 className="login__title">{isLogin ? 'Login' : 'Sign Up'}</h1>

        <div className="login__content">
          {!isLogin ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}>
              <div className="login__box">
                <i className="ri-user-3-line login__icon"></i>
                <div className="login__box-input">
                  <input
                    type="text"
                    name="name"
                    value={User.name}
                    onChange={handleChange}
                    required
                    className="login__input"
                    placeholder=" "
                  />
                  <label className="login__label">Username</label>
                </div>
              </div>

              <div className="login__box">
                <i className="ri-user-3-line login__icon"></i>
                <div className="login__box-input">
                  <input
                    type="email"
                    name="email"
                    value={User.email}
                    onChange={handleChange}
                    required
                    className="login__input"
                    placeholder=" "
                  />
                  <label className="login__label">Email</label>
                </div>
              </div>

              <div className="login__box">
                <i className="ri-lock-2-line login__icon"></i>
                <div className="login__box-input">
                  <input
                    type="password"
                    name="password"
                    value={User.password}
                    onChange={handleChange}
                    required
                    className="login__input"
                    placeholder=" "
                  />
                  <label className="login__label">Password</label>
                  <i className="ri-eye-off-line login__eye"></i>
                </div>
              </div>

              <div className="login__box">
                <i className="ri-lock-2-line login__icon"></i>
                <div className="login__box-input">
                  <input
                    type="text"
                    name="address"
                    value={User.address}
                    onChange={handleChange}
                    required
                    className="login__input"
                    placeholder=" "
                  />
                  <label className="login__label">Home Address</label>
                  <i className="ri-eye-off-line login__eye"></i>
                </div>
              </div>

              <button type="submit" className="login__button">
                Sign up
              </button>
            </form>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }
              }>
              <div className="login__box">
                <i className="ri-user-3-line login__icon"></i>
                <div className="login__box-input">
                  <input type="email" name='email' onChange={handleChange} required className="login__input" placeholder=" " />
                  <label className="login__label">Email</label>
                </div>
              </div>

              <div className="login__box">
                <i className="ri-lock-2-line login__icon"></i>
                <div className="login__box-input">
                  <input type="password" required name='password' onChange={handleChange} className="login__input" placeholder=" " />
                  <label className="login__label">Password</label>
                  <i className="ri-eye-off-line login__eye"></i>
                </div>
              </div>

              <div className="login__check">
                <div className="login__check-group">
                  <input type="checkbox" className="login__check-input" id="login-check" />
                  <label htmlFor="login-check" className="login__check-label">Remember me</label>
                </div>
                <Link
                to='/ForgetPassword'
                className="login__forgot">Forgot Password?</Link>
              </div>

              <button type="submit" className="login__button">
                Login
              </button>
              </form>
            
          )}
        </div>

        <div className="divider"><span>or</span></div>

        <div className="Google">
          <GoogleLogin
           onSuccess={async (credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            
              const googleUserLogin= {
              name: decoded.name,
              email: decoded.email,
              googleUser: true
            };
console.log(googleUserLogin)
            try {
            
              const PostOption = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(googleUserLogin)
                };

                const loginResult = await apiRequest(`${API_USER}/google-login`, PostOption);
                  if(loginResult.error){
                    alert(loginResult.data.message || "Login Failed")
                  }
                  else{
                setIsAuthenticated(true)
                localStorage.setItem("token", loginResult.data.token);
                localStorage.setItem("user", JSON.stringify(loginResult.data));
                console.log(loginResult.data);
                setUser({ name: '', email: '', password: '', address: '' });
                alert(loginResult.data.message);
                  }
                }
              catch (error) {
              console.error("Google login error:", error);
              alert(error.message)
            }
          }}
          
            onError={() => console.log("Login failed")}
          />
        </div>

        <p className="login__register">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={toggleForm} className="toggle-link">Register</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={toggleForm} className="toggle-link">Login</span>
            </>
          )}
        </p>
      </div>
    </div>
    )
  );
};

export default Authentication;
