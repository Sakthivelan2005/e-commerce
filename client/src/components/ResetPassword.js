import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiRequest from '../apiRequest';
import './Authentication.css';

const ResetPassword = ({ API_USER }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest(`${API_USER}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      if (res.error) {
        setMessage(res.message);
      } else {
        setMessage("Password reset successfully.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1 className="login__title">Reset Password</h1>
        <form onSubmit={handleReset}>
          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="password"
                className="login__input"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="login__label">New Password</label>
            </div>
          </div>
          <button type="submit" className="login__button">Reset Password</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
