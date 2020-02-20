export class NodeLocator {
  constructor(input, searchRoot) {
    this.input = input;
    this.searchRoot = searchRoot;
    this.node = null;
  }

  search(selector) {
    this.toggleHighlight();
    this.node = this.searchRoot.querySelector(selector);
    this.toggleHighlight();
    return this;
  }

  toggleHighlight() {
    this.node && this.node.classList.toggle("highlight");
  }
}
