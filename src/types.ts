import type { themes } from "./themes";
import type { sectionMap } from "./themes/utils";

export type Theme = {
  name: string;
  pageTemplate: string;
  contactItemTemplate: string;
  experienceSectionTemplate: string;
  skillsSectionTemplate: string;
  icons: {
    [key: string]: string;
  };
};

export type InputData = {
  defaultLanguage: string;
  theme: keyof typeof themes;
  languages: { [langCode: string]: ResumeData };
  background: Background;
};

export type ResumeData = {
  profile: Profile;
  sections: ValidSection[];
};

export type Profile = {
  name: string;
  caption?: string;
  location?: string;
  description?: string;
  links: Link[];
};

export type Link = {
  label: string;
  href: string;
  icon?: string;
};

export type Section<
  dataType,
  sectionDataTypeName extends ValidSectionDataTypeNames
> = {
  title: string;
  data: dataType;
  type: sectionDataTypeName;
};

export type ValidSection = ExperienceSection | SkillSection;
export type ValidSectionDataTypeNames = keyof typeof sectionMap;

export type ExperienceSection = Section<Experience[], "experienceList">;
export type SkillSection = Section<Skill[], "skillList"> & {
  labels: { low: string; high: string };
};

export type Experience = {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  items: string[];
};

export type Skill = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
};

// background types
export type Background = SolidBackground | YoutubeBackground | VideoBackground;

type SolidBackground = {
  type: "solid";
  color: string;
};

type VideoBackground = {
  type: "video";
  src: string;
};

type YoutubeBackground = {
  type: "youtube";
  src: string;
};
