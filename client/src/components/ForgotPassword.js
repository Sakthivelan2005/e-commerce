import React, { useState } from 'react';
import apiRequest from '../apiRequest';
import './Authentication.css';

const ForgotPassword = ({ API_USER }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
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
        setMessage("Reset link has been sent to your email.");
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
          <p>{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="login__button">Send Reset Link</button>
            {message && <p>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
