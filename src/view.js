import { parse } from "./parser";
import { ThreeView } from "./threeView";
console.log("init");
const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

const htmlInput = $("#htmlInput");
// const searchInput = $("#searchInput");
const threeView = $("#threeView");

const View = new ThreeView(threeView);

if (htmlInput && threeView) {
  console.log("addEventListener");
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
