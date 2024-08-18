// src/App.tsx
import React from "react";
import GoogleAuth from "./components/GoogleAuth";
import PasskeyRegistration from "./components/PasskeyRegistration";
import PasskeyAuthentication from "./components/PasskeyAuthentication";
import User from "./components/User";

const App: React.FC = () => {
  const userId = "some-user-id"; // Replace with actual user ID logic
  const username = "some-username"; // Replace with actual username logic

  return (
    <div>
      <h1>Authentication Methods</h1>
      <GoogleAuth />
      <PasskeyRegistration userId={userId} username={username} />
      <PasskeyAuthentication userId={userId} />
      <User />
    </div>
  );
};

export default App;
