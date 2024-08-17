import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ProjectContextProvider
 from "./store/project-context.jsx";
import App from "./App.jsx";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectContextProvider>
      <App/>
    </ProjectContextProvider>
    {/* <AppWithProvider /> */}
  </React.StrictMode>
);
