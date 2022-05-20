import React, { useContext } from "react";
import convert from "xml-js";
import Context from "../../App.context";

const Tree = () => {
  const { rawXML } = useContext(Context);

  if (rawXML) {
    const xmlToJson = convert.xml2json(rawXML, { compact: true });
    const data = JSON.parse(xmlToJson);
    console.log(data);
    debugger;
  }
  return <div>{(rawXML && "converting data...") || "No data to show"}</div>;
};

export default Tree;
