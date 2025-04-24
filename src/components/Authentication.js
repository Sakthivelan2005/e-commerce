import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './Authentication.css';
import apiRequest from '../apiRequest';

const Authentication = ({ API_URL }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
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
      const API = `${API_URL}/Users`;
      const result = await apiRequest(API, PostOption);
      console.log("Sign up result:", result);

      setUser({ name: '', email: '', password: '', address: '' });
      navigate('/');
    } catch (err) {
      console.error("User error: ", err);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await apiRequest(`${API_URL}/Users`);
      console.log("Fetched data from API:", data); // Check what this logs
  
      if (!data || !Array.isArray(data)) {
        console.error("Expected array but got:", data);
        return;
      }
  
      const matchedUser = data.find(
        (user) => user.email === User.email && user.password === User.password
      );
  
      if (matchedUser) {
        navigate("/");
      } else {
        alert("Account not found. Please enter correct Email and Password or Sign Up.");
      }
    } catch (err) {
      console.error("While Fetching data: ", err);
    }
  };
  
  return (
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
                <p className="login__forgot">Forgot Password?</p>
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
            onSuccess={(credentialResponse) => {
              console.log(jwtDecode(credentialResponse.credential));
              navigate("/");
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
  );
};

export default Authentication;
