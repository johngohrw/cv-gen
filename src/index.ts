import {
  decodeSearchParamsObject,
  initPrintButton,
  loadLanguageLinks,
  loadProfile,
  loadSections,
} from "./utils";
import { InputData } from "./types";

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
    if (data) initResume(data);
    setResumeLoading(false);
  }
}
init();
initPrintButton();

function initResume(data: InputData) {
  const searchParams = getSearchParams();
  const lang: keyof typeof data.languages =
    searchParams.lang ?? data.defaultLanguage ?? Object.keys(data.languages)[0];

  let resumeData = data.languages[lang];
  loadProfile(resumeData.profile);
  loadSections(resumeData.sections);
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
      centerEl.innerHTML = `loading...`;
    }
  } else {
    document
      .getElementById("center-message")
      ?.style.setProperty("opacity", "0");
    document.getElementById("page")?.style.setProperty("opacity", "1");
  }
}
