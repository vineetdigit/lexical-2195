import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ExcalidrawNode, $createExcalidrawNode } from "../nodes/ExcalidrawNode";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand
} from "lexical";

export const INSERT_EXCALIDRAW_COMMAND = createCommand();

export default function ExcalidrawPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ExcalidrawNode])) {
      throw new Error(
        "ExcalidrawPlugin: ExcalidrawNode not registered on editor"
      );
    }

    return editor.registerCommand(
      INSERT_EXCALIDRAW_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const excalidrawNode = $createExcalidrawNode();
          selection.insertNodes([excalidrawNode]);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);
  return null;
}
