import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import viVN from "antd/lib/locale/vi_VN";
import { ConfigProvider } from "antd";
import AuthenticationProvider from "./components/Authentication/AuthenticationProvider";

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <ConfigProvider locale={viVN}>
          <App />
        </ConfigProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
