import React, { useState } from 'react';
import apiRequest from '../apiRequest';
import { useLocation } from 'react-router-dom';
import './Authentication.css';

const ResetPassword = ({ API_USER }) => {
  const location = useLocation();
  const {email} = location.state.email || {};
  const [newPassword, setNewPassword] = useState('');
  console.log(email, newPassword)
  const [message, setMessage] = useState('');
  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest(`${API_USER}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label className="login__label">New Password</label>
            </div>
          </div>

          <button type="submit" className="login__button">Reset Password</button>
           {message && <div className="alert alert-warning d-flex align-items-center" style={{position:'relative', marginTop:'25px'}} role="alert">
        <div>
          {`⚠️ ${message}`}
        </div>
      </div>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
