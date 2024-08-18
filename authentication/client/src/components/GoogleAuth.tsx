// src/components/GoogleAuth.tsx
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuth: React.FC = () => {
  const onSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );
      console.log("Login Success:", response.data);
      // Handle successful login, e.g., redirect or update state
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const onError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
