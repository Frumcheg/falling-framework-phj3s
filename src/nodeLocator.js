export class NodeLocator {
  constructor(input, searchRoot) {
    this.input = input;
    this.searchRoot = searchRoot;
    this.node = null;
  }

  search(selector) {
    if (!selector) return this;
    this.node = this.searchRoot.querySelector(selector);
    this.toggleHighlight();
    return this;
  }

  toggleHighlight() {
    this.node && this.node.classList.toggle("highlight");
  }
}
