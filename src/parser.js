const { DOMParser, NodeFilter } = global;

const allowedNodes = ["div", "html", "#text", "#document", "body"];
const allowedAttributes = ["class", "id", "xmlns"];

class MyParser {
  constructor() {
    this.parser = new DOMParser();
  }

  parse(string) {
    const tempString = `<html xmlns="http://www.w3.org/1999/xhtml">${string}</html>`;
    const { firstChild: parsed } = this.parser.parseFromString(
      tempString,
      "application/xml"
    );
    this.parsed = parsed.firstChild;
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
    if (node.nodeName === "parsererror")
      throw new Error(`HTML (XML) parsing error`);
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
    return this.parsed.documentElement.outerHTML;
  }

  getElement() {
    return this.parsed;
  }
}

const parser = new MyParser();

export function parse(string) {
  parser.parse(string);
  return parser;
}
