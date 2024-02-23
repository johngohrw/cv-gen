import { data } from "./sampleData";
import {
  decodeSearchParamsObject,
  initPrintButton,
  loadLanguageLinks,
  loadProfile,
  loadSections,
} from "./utils";
import { ResumeData } from "./types";

async function init() {
  const url = new URL(window.location.href);
  const searchParamsEncoded = new URLSearchParams(url.search);
  const searchParams = decodeSearchParamsObject(searchParamsEncoded);

  const lang: keyof typeof data.languages =
    searchParams.lang ?? data.defaultLanguage ?? Object.keys(data.languages)[0];

  let resumeData: ResumeData = data.languages[lang];
  loadProfile(resumeData.profile);
  loadSections(resumeData.sections);
  loadLanguageLinks(Object.keys(data.languages));
}
init();
initPrintButton();
