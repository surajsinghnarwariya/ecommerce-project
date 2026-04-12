import { useState } from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      localStorage.setItem("user", user.email);
      window.dispatchEvent(new Event("authChanged"));
      alert("Google Login Success ✅");

    } catch (error) {
      console.log(error);
      alert("Login Failed ❌");
    }
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", email);
      alert("Login Successful ✅");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>

      <h2>Login</h2>

      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>

    </div>
  );
}

export default Login;