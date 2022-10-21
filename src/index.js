import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext/AuthContextProvider";
import FeedContextProvider from "./context/feedContext/FeedContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FeedContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FeedContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
