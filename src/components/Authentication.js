import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login">
      <form className="login__form">
        <h1 className="login__title">{isLogin ? 'Login' : 'Sign Up'}</h1>

        <div className="login__content">
          {!isLogin && (
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>
              <div className="login__box-input">
                <input type="text" required className="login__input" placeholder=" " />
                <label className="login__label">Username</label>
              </div>
            </div>
          )}

          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>
            <div className="login__box-input">
              <input type="email" required className="login__input" placeholder=" " />
              <label className="login__label">Email</label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input type="password" required className="login__input" placeholder=" " />
              <label className="login__label">Password</label>
              <i className="ri-eye-off-line login__eye"></i>
            </div>
          </div>
        </div>

        {isLogin && (
          <div className="login__check">
            <div className="login__check-group">
              <input type="checkbox" className="login__check-input" id="login-check" />
              <label htmlFor="login-check" className="login__check-label">Remember me</label>
            </div>
            <p className="login__forgot">Forgot Password?</p>
          </div>
        )}

        <button type="submit" className="login__button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

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
              Don't have an account? {" "}
              <span onClick={toggleForm} className="toggle-link">Register</span>
            </>
          ) : (
            <>
              Already have an account? {" "}
              <span onClick={toggleForm} className="toggle-link">Login</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Authentication;
