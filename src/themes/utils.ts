import type { Theme } from "../types";

// maps section type key string to template string
export const sectionMap: { [key: string]: keyof Theme } = {
  experienceList: "experienceSectionTemplate",
  skillList: "skillsSectionTemplate",
};

export const setDOMInnerHTML = (ID: string, innerValue: any) => {
  const el = document.getElementById(ID);
  if (el && innerValue) {
    el.innerHTML = innerValue;
  }
};

export const appendDOMInnerHTML = (
  ID: string,
  innerHTML: any,
  position: InsertPosition = "beforeend"
) => {
  const el = document.getElementById(ID);
  if (el && innerHTML) {
    el.insertAdjacentHTML(position, innerHTML);
  }
};

export const appendDOMChildNode = (ID: string, element: any) => {
  const el = document.getElementById(ID);
  if (el && element) {
    el.appendChild(element);
  }
};

export const downloadAsJSON = (object: any, filename = "resume") => {
  console.log(object);
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  let elem = document.createElement("a");
  elem.setAttribute("href", dataStr);
  elem.setAttribute("download", `${filename}.json`);
  elem.click();
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};
