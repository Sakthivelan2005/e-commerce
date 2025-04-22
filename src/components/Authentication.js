import React from 'react'
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const Navigate = useNavigate();
  return (
    <div>
        <GoogleLogin 
            onSuccess={(credentials) => {
              console.log(jwtDecode(credentials.credential))
              Navigate("/")}
            }
            onError={() => console.log("Login failed")}/>
    </div>
  )
}

export default Authentication