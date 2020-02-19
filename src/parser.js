const { DOMParser, NodeFilter } = global;

const allowedNodes = ["div", "html", "#text", "#document"];
const allowedAttributes = ["class", "id"];

class MyParser {
  constructor() {
    this.parser = new DOMParser();
  }

  parse(string) {
    this.parsed = this.parser.parseFromString(string, "text/xml");
    this.validate();
    return this;
  }

  validate() {
    const nodeIterator = document.createNodeIterator(
      this.parsed,
      NodeFilter.SHOW_ALL
    );
    let currentNode = nodeIterator.nextNode();
    while (currentNode) {
      this.validateNode(currentNode);
      currentNode = nodeIterator.nextNode();
    }
  }

  validateNode(node) {
    if (!allowedNodes.includes(node.nodeName))
      throw new Error(`Parse error: wrong tagName ${node.nodeName}`);
    if (node.nodeName === "div") this.validateAttributes(node.attributes);
  }

  validateAttributes(attributes) {
    if (!attributes.length) return;
    let index = 0;
    let currentAttr = attributes.item(index);
    while (currentAttr) {
      if (!allowedAttributes.includes(currentAttr.name)) {
        throw new Error(`Parse error: wrong attribute ${currentAttr.name}`);
      }
      currentAttr = attributes.item(++index);
    }
  }

  getHTML() {
    console.dir(this.parsed.documentElement);
    return this.parsed.documentElement.outerHTML;
  }
}

const parser = new MyParser();

export function parse(string) {
  parser.parse(string);
  return parser;
}
