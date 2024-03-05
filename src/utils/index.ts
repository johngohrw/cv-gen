import Handlebars from "handlebars";
import { Profile, Theme, ValidSection, ValidSectionDataTypeNames } from "../../types";
import { IDSchema } from "../themes/schema";

export function getSearchParams() {
  const url = new URL(window.location.href);
  const searchParamsEncoded = new URLSearchParams(url.search);
  return decodeSearchParamsObject(searchParamsEncoded);
}

// decode an encoded searchParams object for both keys and values
export const decodeSearchParamsObject = (searchParams: URLSearchParams) => {
  return Object.entries(Object.fromEntries(searchParams.entries())).reduce(
    (acc: any, [key, val]) => {
      acc[decodeURIComponent(key)] = decodeURIComponent(val);
      return acc;
    },
    {}
  );
};

export const setDOMInnerHTML = (ID: string, innerValue: any) => {
  const el = document.getElementById(ID);
  if (el && innerValue) {
    el.innerHTML = innerValue;
  }
};
export const appendDOMChildNode = (ID: string, element: any) => {
  const el = document.getElementById(ID);
  if (el && element) {
    el.appendChild(element);
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

export const loadThemeTemplate = async (
  theme: Theme,
  stylesheetOnLoadCallback = () => {}
) => {
  var fileref = document.createElement("link");
  fileref.rel = "stylesheet";
  fileref.type = "text/css";
  fileref.href = `themes/${theme.name}/styles/index.css`;
  fileref.onload = stylesheetOnLoadCallback;
  document.getElementsByTagName("head")[0].appendChild(fileref);

  const pageElement = Handlebars.compile(theme.pageTemplate);
  const innerHTML = pageElement({});
  setDOMInnerHTML(IDSchema.page, innerHTML);
};

export const loadProfile = async (theme: Theme, profileData: Profile) => {
  setDOMInnerHTML(IDSchema.profile.name, profileData.name);
  setDOMInnerHTML(IDSchema.profile.caption, profileData.caption);
  profileData.links.forEach((link) => {
    const contactLinkItem = Handlebars.compile(theme.contactItemTemplate);
    const innerHTML = contactLinkItem(link);
    appendDOMInnerHTML(IDSchema.profile.links, innerHTML);
  });
};

export const loadSections = (theme: Theme, sectionsData: ValidSection[]) => {
  sectionsData.forEach((section) => {
    const sectionElement = Handlebars.compile(theme[sectionMap[section.type]]);
    const innerHTML = sectionElement(section);
    appendDOMInnerHTML(IDSchema.section.container, innerHTML);
  });
};

// maps section type key string to template string
export const sectionMap: { [key: string]: keyof Theme } = {
  experienceList: "experienceSectionTemplate",
  skillList: "skillsSectionTemplate",
};

export const loadLanguageLinks = (langCodes: string[]) => {
  langCodes.forEach((langCode) => {    
    appendDOMInnerHTML(
      IDSchema.languages.container,
      `<a href="${
        window.location.origin
      }?${new URLSearchParams({...getSearchParams(), lang: langCode}).toString()}">${langCode.toUpperCase()}</a>`
    );
  });
};

export function initPrintButton() {
  const element = document.getElementById(IDSchema.printButton);
  if (element) {
    element.addEventListener("click", () => {
      print();
    });
  }
}

// TODO: source is currently broken (./assets/videos/herobg.webm)
export function initBGVideo() {
  // delayed load for bg video.
  setTimeout(() => {
    const element = document.getElementById(IDSchema.bgContainer);
    if (element)
      element.innerHTML = `<video class="bg-video" id="bg-video" style="opacity: 0 !important" autoplay muted playsinline loop>
        <source src="./assets/videos/herobg.webm" type="video/webm" />
        <p>your browser cannot autoplay videos! :(</p>
    </video>`;
    const videoElement = document.getElementById(
      "bg-video"
    ) as HTMLVideoElement;
    if (videoElement) videoElement.playbackRate = 0.5;

    setTimeout(() => {
      const videoElement = document.getElementById(
        "bg-video"
      ) as HTMLVideoElement;
      if (videoElement) videoElement.setAttribute("style", "");
    }, 500);
  }, 500);
}
