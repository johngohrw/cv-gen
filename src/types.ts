import { themes } from "./themes";

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

export type ValidSection = ExperienceSection | SkillSection;

export type ExperienceSection = Section<Experience[], "experienceList">;
export type SkillSection = Section<Skill[], "skillList"> & {
  labels: { low: string; high: string };
};

export type Section<dataType, dataTypeName> = {
  title: string;
  data: dataType;
  type: dataTypeName;
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

export type InputData = {
  defaultLanguage: string;
  theme: keyof typeof themes;
  languages: { [langCode: string]: ResumeData };
};

export type Theme = {
  name: string;
  pageTemplate: string;
  contactItemTemplate: string;
  experienceSectionTemplate: string;
  skillsSectionTemplate: string;
};
