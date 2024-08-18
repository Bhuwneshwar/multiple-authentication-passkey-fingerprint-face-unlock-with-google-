// src/components/User.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  displayName: string;
  email: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      });
      setUser(response.data);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default User;
