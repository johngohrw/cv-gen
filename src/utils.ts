import Handlebars from "handlebars";
import { contactItemTemplate } from "./components/contactSection";
import { experienceSectionTemplate } from "./components/experienceSection";
import { skillsSectionTemplate } from "./components/skillsSection";
import { IDSchema } from "./schema";
import { Profile, ValidSection } from "./types";

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

export const loadProfile = (profileData: Profile) => {
  setDOMInnerHTML(IDSchema.profile.name, profileData.name);
  setDOMInnerHTML(IDSchema.profile.caption, profileData.caption);
  profileData.links.forEach((link) => {
    const contactLinkItem = Handlebars.compile(contactItemTemplate);
    const innerHTML = contactLinkItem(link);
    appendDOMInnerHTML(IDSchema.profile.links, innerHTML);
  });
};

export const loadSections = (sectionsData: ValidSection[]) => {
  sectionsData.forEach((section) => {
    const sectionElement = Handlebars.compile(sectionMap[section.type]);
    const innerHTML = sectionElement(section);
    appendDOMInnerHTML(IDSchema.section.container, innerHTML);
  });
};

export const loadLanguageLinks = (langCodes: string[]) => {
  langCodes.forEach((langCode) => {
    appendDOMInnerHTML(
      IDSchema.languages.container,
      `<a href="${
        window.location.origin
      }?lang=${langCode}">${langCode.toUpperCase()}</a>`
    );
  });
};

export const sectionMap = {
  experienceList: experienceSectionTemplate,
  skillList: skillsSectionTemplate,
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
