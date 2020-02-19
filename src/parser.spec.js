import { parse } from "./parser";

describe("parser", () => {
  it("throw error on invalid string", () => {
    expect(() => {
      parse("sdf");
    }).toThrow();
  });

  it("throw error on enclosed tag", () => {
    expect(() => {
      parse("<div>");
    }).toThrow();
  });

  it("throw error on invalid tags", () => {
    expect(() => {
      parse("<span/>");
    }).toThrow();
  });

  it("throw error on nested invalid tags", () => {
    expect(() => {
      parse("<div><span/></div>");
    }).toThrow();
  });

  it("throw error on invalid tags in siblings", () => {
    expect(() => {
      parse("<div><div/><span/></div>");
    }).toThrow();
  });

  it("throw error on invalid attributes in div", () => {
    expect(() => {
      parse("<div style=''/>");
    }).toThrow();
  });

  it("valid div with class attr", () => {
    expect(() => {
      parse("<div class=''/>");
    }).not.toThrow();
  });
});
