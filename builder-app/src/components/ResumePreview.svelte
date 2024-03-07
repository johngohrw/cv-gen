<script lang="ts">
  import Handlebars from "handlebars";
  import { themes } from "../../../src/themes/";
  import type { ResumeData } from "../../../types";
  import { IDSchema } from "../../../src/themes/schema";
  import {
    appendDOMInnerHTML,
    sectionMap,
    setDOMInnerHTML,
  } from "../../../src/utils";

  let themeName: keyof typeof themes = "default";
  export { themeName as theme };
  let theme = themes[themeName];
  let pageElement: HTMLDivElement;

  export let resumeData: ResumeData;

  $: if (themeName) {
    import(`../../../src/themes/default/styles/index.css`);
  }

  $: if (pageElement && theme && resumeData) {
    // load page template
    pageElement.innerHTML = Handlebars.compile(theme.pageTemplate)({});

    // load profile and contact links
    setDOMInnerHTML(IDSchema.profile.name, resumeData.profile.name);
    setDOMInnerHTML(IDSchema.profile.caption, resumeData.profile.caption);
    resumeData.profile.links.forEach((link) => {
      appendDOMInnerHTML(
        IDSchema.profile.links,
        Handlebars.compile(theme.contactItemTemplate)(link)
      );
    });

    // load sections
    resumeData.sections.forEach((section) => {
      appendDOMInnerHTML(
        IDSchema.section.container,
        Handlebars.compile(theme[sectionMap[section.type]])(section)
      );
    });
  }
</script>

<div class="flex flex-col items-center px-8">
  <div class="page-frame" id="page" bind:this={pageElement} />
</div>

<style>
  #page {
    transition-duration: 200ms;
    transition-delay: 200ms;
  }

  .page-frame {
    max-width: 850px;
    width: 100%;
    padding: 64px;
    background: #f5f5f5;
    box-shadow: 3px 3px 13px -3px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
    margin: 2rem;
  }
</style>
