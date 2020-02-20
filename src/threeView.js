function createViewName(node) {
  let attrsString = "";
  const classes = node.getAttributeNode("class");
  const id = node.getAttributeNode("id");
  if (classes) attrsString += `${classes.name}="${classes.value}"`;
  if (id) attrsString += ` ${id.name}="${id.value}"`;
  return node.hasChildNodes()
    ? `<${node.nodeName} ${attrsString}>`
    : `<${node.nodeName} ${attrsString}/>`;
}

export class ThreeView {
  constructor(root) {
    this.root = root;
    this.handlersInited = false;
  }

  addNode(node) {
    this.removeChild();
    console.log(node);
    this.root.appendChild(node);
    return this;
  }

  removeChild() {
    this.root.firstChild && this.root.removeChild(this.root.firstChild);
  }

  initClasses() {
    const nodeIterator = document.createNodeIterator(
      this.root,
      NodeFilter.SHOW_ELEMENT
    );
    let currentNode = nodeIterator.nextNode();
    while (currentNode) {
      if (currentNode.id !== "threeView") {
        currentNode.setAttribute("view-name", createViewName(currentNode));
        if (currentNode.hasChildNodes()) {
          currentNode.setAttribute("tabindex", "0");
        }
      }
      currentNode = nodeIterator.nextNode();
    }
    return this;
  }

  initHandlers() {
    if (!this.handlersInited) {
      this.root.addEventListener("click", event => {
        const { target } = event;
        if (target.hasAttribute("tabindex")) {
          target.classList.toggle("is-closed");
        }
      });

      document.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
          const { activeElement } = document;
          if (activeElement.hasAttribute("tabindex")) {
            activeElement.classList.toggle("is-closed");
          }
        }
      });
      this.handlersInited = true;
    }
    return this;
  }
}
