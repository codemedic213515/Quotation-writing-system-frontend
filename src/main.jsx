import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from '@/widgets/layout/auth-layout';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
          <AuthProvider>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
            <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
          </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


