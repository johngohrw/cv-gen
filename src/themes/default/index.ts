import type { Theme } from "../../types";
import { contactItemTemplate } from "./components/contactItemTemplate";
import { experienceSectionTemplate } from "./components/experienceSectionTemplate";
import { skillsSectionTemplate } from "./components/skillsSectionTemplate";
import { pageTemplate } from "./pageTemplate";

export const defaultTheme: Theme = {
  name: "default",
  pageTemplate: pageTemplate,
  contactItemTemplate: contactItemTemplate,
  experienceSectionTemplate: experienceSectionTemplate,
  skillsSectionTemplate: skillsSectionTemplate,
};
