import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import App from "./components/App";

//import styles
import styles from "./scss/application.scss";

render(<App className="app" />, document.getElementById("root"));
