import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./providers/user.js";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);
