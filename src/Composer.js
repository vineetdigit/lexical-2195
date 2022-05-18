import React from "react";
import LexicalComposer from "@lexical/react/LexicalComposer";
import registeredNodes from "./nodes";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import Editor from "./Editor";

function Composer() {
  const initialConfig = {
    namespace: "PlaygroundEditor",
    nodes: [...registeredNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-shell">
        <Editor />
      </div>
    </LexicalComposer>
  );
}

export default Composer;
