import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import StoreProvider from "./store/StoreProvider";
import viVN from "antd/lib/locale/vi_VN";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ConfigProvider locale={viVN}>
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
