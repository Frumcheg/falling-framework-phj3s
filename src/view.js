import { parse } from "./parser";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const htmlInput = $("#htmlInput");
const searchInput = $("#searchInput");
const threeView = $("#threeView");

if (htmlInput && threeView) {
  htmlInput.addEventListener("change", event => {
    const { value } = event.target;
    if (!value) return;
    let parsed;
    try {
      parsed = parse(value);
    } catch (e) {
      threeView.innerText = e;
      return;
    }
    threeView.innerText = parsed.getHTML();
  });
}
