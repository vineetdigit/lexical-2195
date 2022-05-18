import React, { useEffect, useState } from "react";
import OnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ExcalidrawPlugin, {
  INSERT_EXCALIDRAW_COMMAND
} from "./plugins/ExcalidrawPlugin";
import { Button } from "react-bootstrap";

const key = "lexical-repro";

function InsertExcalidrawNode() {
  const [editor] = useLexicalComposerContext();

  return (
    <Button onClick={() => editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND)}>
      Insert Excalidraw
    </Button>
  );
}

export default function Editor() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="d-flex flex-column px-4 ">
      <b>Editor</b>
      This sandbox loads the initialEditorState from localStorage. It stores
      every change (sorry) to editorState in onChange callback
      <br />
      <div className="richtext-container mt-2">
        <RichTextPlugin
          contentEditable={
            <LexicalContentEditable className="richtext-editor border rounded" />
          }
          placeholder={
            <div className="richtext-content-placeholder text-secondary">
              Placeholder
            </div>
          }
          initialEditorState={
            window.localStorage.getItem(key)
              ? editor.parseEditorState(window.localStorage.getItem(key))
              : undefined
          }
        />
        <ExcalidrawPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            window.localStorage.setItem(
              key,
              JSON.stringify(editorState.toJSON())
            );
          }}
        />
        <div className="d-flex flex-column border-top pt-3">
          <p />
          <span>
            <em>To reproduce: </em>
          </span>
          <ol>
            <li>run the app</li>
            <li>
              if present, delete key/value pair named "lexical-repro" from local
              storage
            </li>
            <li>focus editor and type some text</li>
            <li>
              Insert custom Excalidraw node with this button{" "}
              <InsertExcalidrawNode />
            </li>
            <li>Hit refresh button above to reload app in sandbox </li>
            <li>
              Observe that the text is restored, but Excalidraw node is not{" "}
            </li>
          </ol>
        </div>
        <TreeViewPlugin />
      </div>
    </div>
  );
}
