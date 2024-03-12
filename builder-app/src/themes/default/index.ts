import type { Theme } from "../../types";
import { contactItemTemplate } from "./components/contactItemTemplate";
import { experienceSectionTemplate } from "./components/experienceSectionTemplate";
import { skillsSectionTemplate } from "./components/skillsSectionTemplate";
import { pageTemplate } from "./pageTemplate";
import icons from "./assets/icons";

export const theme: Theme = {
  name: "default",
  pageTemplate: pageTemplate,
  contactItemTemplate: contactItemTemplate,
  experienceSectionTemplate: experienceSectionTemplate,
  skillsSectionTemplate: skillsSectionTemplate,
  icons: icons,
};

export default theme;
