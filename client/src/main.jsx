import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AppProvider } from "./context/Appcontext.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
