<script lang="ts">
  import Handlebars from "handlebars";
  import type { ResumeData } from "../types";
  import { IDSchema } from "../themes/schema";
  import { themes } from "../themes";
  import {
    appendDOMInnerHTML,
    sectionMap,
    setDOMInnerHTML,
  } from "../themes/utils";
  import Button from "./Builder/Button.svelte";

  let themeName: keyof typeof themes = "default";
  export { themeName as theme };
  let theme = themes[themeName];
  let pageElement: HTMLDivElement;

  export let resumeData: ResumeData;

  $: if (themeName) {
    import(`../themes/${themeName}/styles/index.css`);
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

<div class="flex flex-col items-center px-8" id="page-container">
  <div class="page-frame" id="page" bind:this={pageElement} />
  <Button
    type="default"
    class="fixed bottom-[24px] right-[24px] !text-[16px] !px-5 !py-2 !rounded-full font-medium"
    on:click={() => print()}
  >
    Print
  </Button>
</div>

<style>
  @media print {
    :global(body),
    :global(body) > :global(div),
    :global(body) > :global(div) > :global(div),
    #page-container {
      background: none !important;
      padding: 0px !important;
      min-height: unset !important;
      margin: 0px !important;
      box-shadow: unset !important;
      transform: none !important;
    }
    :global(:not(#page *)) {
      /* border: 4px solid green; */
      margin: 0;
    }
    #page-container > :global(button) {
      display: none;
    }
    #page {
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      background: none !important;
      box-shadow: unset !important;
      transform: none !important;
    }
  }

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
