// src/components/PasskeyRegistration.tsx
import React from "react";
import axios from "axios";
import { startRegistration } from "@simplewebauthn/browser";

interface PasskeyRegistrationProps {
  userId: string;
  username: string;
}

const PasskeyRegistration: React.FC<PasskeyRegistrationProps> = ({
  userId,
  username,
}) => {
  const registerPasskey = async () => {
    try {
      const response = await axios.get(
        `/api/auth/generate-registration-options?userId=${userId}&username=${username}`
      );
      const options = response.data;

      const attResp = await startRegistration(options);

      await axios.post("/api/auth/verify-registration", { attResp, userId });
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return <button onClick={registerPasskey}>Register Passkey</button>;
};

export default PasskeyRegistration;
