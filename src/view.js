import { parse } from "./parser";
import { ThreeView } from "./threeView";
import { NodeLocator } from "./nodeLocator";
const $ = document.querySelector.bind(document);

const htmlInput = $("#htmlInput");
const searchInput = $("#searchInput");
const threeView = $("#threeView");

if (htmlInput && searchInput && threeView) {
  const View = new ThreeView(threeView);
  const Locator = new NodeLocator(searchInput, threeView);
  const p = document.createElement("p");
  searchInput.addEventListener("change", event => {
    p.remove();
    Locator.toggleHighlight();

    const { value } = event.target;
    try {
      Locator.search(value);
    } catch (e) {
      p.innerText = e;
      searchInput.parentNode.appendChild(p);
    }
  });
  htmlInput.addEventListener("change", event => {
    const { value } = event.target;
    if (!value) {
      threeView.innerText = "";
      return;
    }
    let parsed;
    try {
      parsed = parse(value);
    } catch (e) {
      threeView.innerText = e;
      return;
    }
    View.addNode(parsed.getElement())
      .initClasses()
      .initHandlers();
  });
}
