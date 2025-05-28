import React, { useState } from 'react';
import apiRequest from '../apiRequest';
import './Authentication.css';
import {  useNavigate } from 'react-router-dom';

const ForgotPassword = ({ API_USER }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest(`${API_USER}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.error) {
        setMessage(res.message);
      } else {
       setSubmitted(true);
      }

      console.log(res)
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage("Something went wrong.");
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest(`${API_USER}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
     console.log(res);
      if (res.error) {
        setMessage(res.message);
      } else {
       navigate(
        '/reset-password',{
          state:{
            email,
          }
        }
       )
        setSubmitted(true);
      }

      console.log(res)
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1 className="login__title">Forgot Password</h1>
        {submitted ? (
           <form onSubmit={handleOTP}>
            
              <p style={{textAlign: 'center'}}>OTP is send to {email}</p>
            <div className="login__box">
              <i className="ri-mail-line login__icon"></i>
              <div className="login__box-input">
                <input
                  type="number"
                  className="login__input"
                  placeholder=" "
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <label className="login__label">Enter your OTP</label>
              </div>
            </div>
            <button type="submit" className="login__button">Verify</button>
            {message && <p>{message}</p>}
          </form>
        ) : (
          <form onSubmit={handleEmail}>
            <div className="login__box">
              <i className="ri-mail-line login__icon"></i>
              <div className="login__box-input">
                <input
                  type="email"
                  className="login__input"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="login__label">Enter your email</label>
              </div>
            </div>
            <button type="submit" className="login__button">Get OTP</button>
           {message && <div className="alert alert-warning d-flex align-items-center" style={{position:'relative', marginTop:'25px'}} role="alert">
        <div>
          {`⚠️ ${message}`}
        </div>
      </div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
