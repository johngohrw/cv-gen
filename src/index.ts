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
    setResumeLoading(true, dataSourceName);
    const data: InputData = (await (await fetch(dataSourceURL)).json()) ?? null;
    if (data) {
      await initResume(data);
      setResumeLoading(false);
    } else {
      setCenterMessage(`Failed to load resume`);
    }
  }
}
init();
initPrintButton();

async function initResume(data: InputData) {
  const searchParams = getSearchParams();
  const lang: keyof typeof data.languages =
    searchParams.lang ?? data.defaultLanguage ?? Object.keys(data.languages)[0];

  const theme = themes[data.theme ?? "default"];

  await loadThemeTemplate(theme);

  let resumeData = data.languages[lang];
  loadProfile(theme, resumeData.profile);
  loadSections(theme, resumeData.sections);
  loadLanguageLinks(Object.keys(data.languages));
}

function getSearchParams() {
  const url = new URL(window.location.href);
  const searchParamsEncoded = new URLSearchParams(url.search);
  return decodeSearchParamsObject(searchParamsEncoded);
}

export function setResumeLoading(
  isLoading: boolean,
  dataSourceName: string = ""
) {
  if (isLoading) {
    const centerEl = document.getElementById("center-message");
    if (centerEl) {
      centerEl.style.setProperty("opacity", "1");
      setCenterMessage(`Loading...`);
    }
  } else {
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
