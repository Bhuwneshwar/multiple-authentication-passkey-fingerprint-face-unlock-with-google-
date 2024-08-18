// src/components/PasskeyAuthentication.tsx
import React from "react";
import axios from "axios";
import { startAuthentication } from "@simplewebauthn/browser";

interface PasskeyAuthenticationProps {
  userId: string;
}

const PasskeyAuthentication: React.FC<PasskeyAuthenticationProps> = ({
  userId,
}) => {
  const authenticate = async () => {
    try {
      const response = await axios.get(
        `/api/auth/generate-authentication-options?userId=${userId}`
      );
      const options = response.data;

      const authResp = await startAuthentication(options);

      await axios.post("/api/auth/verify-authentication", { authResp, userId });
      alert("Authentication successful!");
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return <button onClick={authenticate}>Authenticate with Passkey</button>;
};

export default PasskeyAuthentication;
