import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";

const FingerprintRegistration = () => {
  const registerFingerprint = async () => {
    try {
      const response = await axios.get("/api/generate-registration-options");
      const options = response.data;

      const attResp = await startRegistration(options);

      await axios.post("/api/verify-registration", { attResp });
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return <button onClick={registerFingerprint}>Register Fingerprint</button>;
};

export default FingerprintRegistration;
