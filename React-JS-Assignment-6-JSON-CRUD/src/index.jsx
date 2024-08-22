import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Employees from "./Employees";
import "./index.css"; // Ensure you have this if you are using CSS

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/employees" element={<Employees />} />
		</Routes>
	</BrowserRouter>
);



