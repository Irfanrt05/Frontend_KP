import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId="471473422571-dumsu4tmj0gbgov3kl9g8dd232h0t5dt.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);