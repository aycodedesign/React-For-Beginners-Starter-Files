import React from "react";
import { render } from "react-dom";
//render is how to export to the DOM
import Router from "./components/Router";
import "./css/style.css"

render(<Router />, document.querySelector('#main'));