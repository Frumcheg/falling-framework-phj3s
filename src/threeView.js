export class ThreeView {
  constructor(root) {
    this.root = root;
  }

  addNode(node) {
    console.dir(node);
    this.root.appendChild(node);
    this.root.replaceChild(this.root.lastChild, this.root.firstChild);
    // this.root.innerHTML = node.outerHTML;
    return this;
  }

  initClasses() {
    const nodeIterator = document.createNodeIterator(
      this.root,
      NodeFilter.SHOW_ELEMENT
    );
    let currentNode = nodeIterator.nextNode();
    while (currentNode) {
      if (currentNode.hasChildNodes() && currentNode.id !== "threeView") {
        currentNode.setAttribute("tabindex", "0");
      }
      currentNode = nodeIterator.nextNode();
    }
    return this;
  }

  initHandlers() {
    this.root.addEventListener("click", event => {
      const { target } = event;
      if (target.hasAttribute("tabindex")) {
        console.log(target);
        target.classList.contains("is-closed")
          ? target.classList.remove("is-closed")
          : target.classList.add("is-closed");
      }
    });
  }
}
