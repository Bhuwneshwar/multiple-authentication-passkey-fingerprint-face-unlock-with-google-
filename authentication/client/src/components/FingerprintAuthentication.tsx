import { startAuthentication } from "@simplewebauthn/browser";
import axios from "axios";

const FingerprintAuthentication = () => {
  const authenticate = async () => {
    try {
      const response = await axios.get("/api/generate-authentication-options");
      const options = response.data;

      const authResp = await startAuthentication(options);

      await axios.post("/api/verify-authentication", { authResp });
      alert("Authentication successful!");
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return <button onClick={authenticate}>Authenticate with Fingerprint</button>;
};

export default FingerprintAuthentication;
