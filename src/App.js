import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Dropzone from "./components/DropZone";
import Tree from "./components/Tree";
import Context from "./App.context";

import "./styles.css";

export default function App() {
  const [rawXML, setRawXML] = useState("");

  return (
    <Context.Provider value={{ rawXML, setRawXML }}>
      <div className="app">
        <Typography variant="h4" mt={4} mb={4} component="div">
          UPLOAD AN XML
        </Typography>
        <Dropzone />
        <Tree />
      </div>
    </Context.Provider>
  );
}
