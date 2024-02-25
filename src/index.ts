import {
  decodeSearchParamsObject,
  initPrintButton,
  loadLanguageLinks,
  loadProfile,
  loadSections,
  loadThemeTemplate,
} from "./utils";
import { InputData } from "./types";
import { themes } from "./themes";

export type ResumeState = keyof typeof resumeStateMap;

let loadPrerequisites = {
  DATA: false,
  STYLES: false,
  TEMPLATES: false,
};

export const resumeStateMap = {
  IDLE: "Welcome to cv-gen!",
  DATA_FETCHING: "Loading resume...",
  DATA_ERROR: "Failed to load resume data.",
  DATA_SUCCESS: "Resume data loaded.",
  STYLES_FETCHING: "Loading styles...",
  STYLES_ERROR: "Failed to load resume theme.",
  STYLES_SUCCESS: "Styles loaded.",
  TEMPLATES_LOADING: "Compiling templates...",
  TEMPLATES_ERROR: "Failed to compile resume templates.",
  TEMPLATES_SUCCESS: "Templates compiled.",
};

const envResumeData = process.env.PRELOADED_RESUME_DATA;

async function init() {
  const searchParams = getSearchParams();

  const dataSourceName = envResumeData
    ? "env"
    : "data" in searchParams && searchParams.data
    ? "url"
    : null;

  if (dataSourceName) {
    const dataSourceURL = envResumeData ?? searchParams.data;
    setResumeState("DATA_FETCHING");
    const data: InputData = (await (await fetch(dataSourceURL)).json()) ?? null;
    setResumeState("DATA_SUCCESS");
    if (data) {
      await initResume(data);
    } else {
      setResumeState("DATA_ERROR");
    }
  }
}
setResumeState("IDLE");
init();
initPrintButton();

async function initResume(data: InputData) {
  const searchParams = getSearchParams();
  const lang: keyof typeof data.languages =
    searchParams.lang ?? data.defaultLanguage ?? Object.keys(data.languages)[0];
  const theme = themes[data.theme ?? "default"];

  setResumeState("STYLES_FETCHING");
  await loadThemeTemplate(theme, () => {
    setResumeState("STYLES_SUCCESS");
  });

  setResumeState("TEMPLATES_LOADING");
  let resumeData = data.languages[lang];
  loadProfile(theme, resumeData.profile);
  loadSections(theme, resumeData.sections);
  loadLanguageLinks(Object.keys(data.languages));
  setResumeState("TEMPLATES_SUCCESS");
}

function getSearchParams() {
  const url = new URL(window.location.href);
  const searchParamsEncoded = new URLSearchParams(url.search);
  return decodeSearchParamsObject(searchParamsEncoded);
}

export function setResumeState(state: ResumeState) {
  const message = resumeStateMap[state];
  setCenterMessage(message);

  // update load prerequisites
  if (["DATA_SUCCESS", "TEMPLATES_SUCCESS", "STYLES_SUCCESS"].includes(state)) {
    const key = state.split("_")[0] as keyof typeof loadPrerequisites;
    loadPrerequisites[key] = true;
  }

  // check if load prerequisites are met
  if (!Object.values(loadPrerequisites).includes(false)) {
    document
      .getElementById("center-message")
      ?.style.setProperty("opacity", "0");
    document.getElementById("page")?.style.setProperty("opacity", "1");
  }
}

export function setCenterMessage(text: string) {
  const centerEl = document.getElementById("center-message");
  if (centerEl) {
    centerEl.innerHTML = text;
  }
}
