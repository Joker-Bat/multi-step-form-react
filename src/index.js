import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { initialState, storeReducer } from "./store/reducer";
import { MultiStepProvider } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MultiStepProvider initialState={initialState} reducer={storeReducer}>
      <App />
    </MultiStepProvider>
  </React.StrictMode>
);
