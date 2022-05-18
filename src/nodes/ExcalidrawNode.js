import { DecoratorNode } from "lexical";

function ExcalidrawComponent({ nodeKey, data }) {
  return (
    <div className="bg-success text-white mb-3">
      Excalidraw nodekey {nodeKey}
    </div>
  );
}

export class ExcalidrawNode extends DecoratorNode {
  __data;

  static getType() {
    return "excalidraw";
  }

  static clone(node) {
    console.log(
      "clone ->",
      "node.__data:",
      node.__data,
      "node.__key:",
      node.__key,
      "node:",
      JSON.stringify(node, null, 2)
    );
    return new ExcalidrawNode(node.__data, node.__key);
  }

  constructor(data = "[]", key) {
    super(key);
    this.__data = data;
  }

  // View
  createDOM(config) {
    const div = document.createElement("div");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      div.className = className;
    }
    console.log("createDEOM ->", div);
    return div;
  }

  updateDOM() {
    return false;
  }

  setData(data) {
    const self = this.getWritable();
    self.__data = data;
  }

  decorate(editor) {
    console.log(
      "decorate ->",
      "this.getKey():",
      this.getKey(),
      "this.__data:",
      this.__data
    );
    return <ExcalidrawComponent nodeKey={this.getKey()} data={this.__data} />;
  }
}

export function $createExcalidrawNode() {
  return new ExcalidrawNode();
}

export function $isExcalidrawNode(node) {
  return node instanceof ExcalidrawNode;
}
