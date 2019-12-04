const React = require("react");
const ReactDom = require("react-dom");

import App from "../components/App";
import "../css/app/reset.css"
import "../css/app/app.css";

ReactDom.render(<App />, document.getElementById("root"));
