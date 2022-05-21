import React, { useContext } from "react";
import convert from "xml-js";
import Context from "../../App.context";

const Tree = () => {
  const { rawXML } = useContext(Context);

  if (rawXML) {
    const xmlToJson = convert.xml2json(rawXML, { ignoreDeclaration: true });
    const [xmlRoot] = JSON.parse(xmlToJson).elements;
    console.log(xmlRoot);
    debugger;
  }
  return <div>{(rawXML && "converting data...") || "No data to show"}</div>;
};

export default Tree;
