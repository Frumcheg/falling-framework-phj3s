import { parse } from "./parser";
import { ThreeView } from "./threeView";
import { NodeLocator } from "./nodeLocator";
const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

const htmlInput = $("#htmlInput");
const searchInput = $("#searchInput");
const threeView = $("#threeView");

if (htmlInput && searchInput && threeView) {
  const View = new ThreeView(threeView);
  const Locator = new NodeLocator(searchInput, threeView);
  searchInput.addEventListener("change", event => {
    const { value } = event.target;
    Locator.search(value);
  });
  htmlInput.addEventListener("change", event => {
    const { value } = event.target;
    console.log("change", value);
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
