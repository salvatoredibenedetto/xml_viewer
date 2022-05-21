import React, { useContext, useState, useEffect } from "react";
import convert from "xml-js";
import Context from "../../App.context";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { v4 as uuidv4 } from "uuid";

const Tree = () => {
  const { rawXML } = useContext(Context);
  const [xmlRoot, setXmlRoot] = useState({});

  useEffect(() => {
    if (rawXML) {
      const xmlToJson = convert.xml2json(rawXML, {
        ignoreDeclaration: true,
        elementsKey: "children"
      });
      const [root] = JSON.parse(xmlToJson).children;
      setXmlRoot(root);
    }
  }, [rawXML]);

  const renderTree = (nodes) => {
    const uuid = uuidv4();
    return (
      <div key={uuid}>
        {nodes.type === "text" && (
          <p className={"text-content"}>{nodes.text}</p>
        )}
        <TreeItem nodeId={uuid} label={nodes.name}>
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
      </div>
    );
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "100%",
        width: "100%",
        textAlign: "left",
        overflowY: "auto",
        display: "flex"
      }}
    >
      {renderTree(xmlRoot)}
    </TreeView>
  );
};

export default Tree;
