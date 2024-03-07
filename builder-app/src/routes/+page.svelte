<script lang="ts">
  import { Menu } from "lucide-svelte";
  import type { InputData } from "../../../types";
  import Button from "../components/Button.svelte";
  import Form from "../components/Form.svelte";
  import ResumeForm from "../components/ResumeForm.svelte";
  import TextInput from "../components/TextInput.svelte";
  import FormSection from "../components/FormSection.svelte";
  import ResumePreview from "../components/ResumePreview.svelte";

  let formState: InputData = {
    defaultLanguage: "",
    theme: "default",
    languages: {},
  };
  let jsonToImport: string = "";
  let sidebarWidth: number = 360;
  let showSidebar: boolean = true;

  const sidebarStates = ["builder", "importJSON"] as const;
  let sidebarState: (typeof sidebarStates)[number] = sidebarStates[0];

  let currentLanguage: string | null = null;
  let langIsAdding: boolean = false;
  let langCodeToAdd: string = "en";

  const handleAddLanguage = () => {
    currentLanguage = langCodeToAdd;
    if (Object.keys(formState.languages).length <= 0) {
      formState.defaultLanguage = langCodeToAdd;
    }
    const updatedLanguages = { ...formState.languages };
    updatedLanguages[langCodeToAdd] = {
      profile: {
        name: "",
        caption: "",
        location: "",
        description: "",
        links: [],
      },
      sections: [],
    };
    formState.languages = updatedLanguages;
    langCodeToAdd = "";
    langIsAdding = false;
  };
</script>

<div class="h-full relative bg-gray-800">
  <div class="fixed top-0 inset-x-0 h-[40px] bg-gray-100 z-10">
    <div class="h-full w-full relative flex flex-row items-center">
      <button
        class="flex items-center justify-center aspect-square h-[40px] ml-2"
        on:click={() => (showSidebar = !showSidebar)}
        ><Menu color="#666" /></button
      >
      <div class="ml-2">
        <Button type="secondary" on:click={() => (sidebarState = "importJSON")}
          >Import from JSON</Button
        >
      </div>
      <div
        class="text-gray-500 text-[11px] font-semibold font absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        RESUME BUILDER
      </div>
    </div>
  </div>

  <div
    class="flex flex-col gap-3 fixed bg-gray-200 duration-200 px-2 overflow-auto pt-[40px] h-full"
    style="width: {sidebarWidth}px; left: {showSidebar ? 0 : -sidebarWidth}px;"
  >
    {#if sidebarState === "builder"}
      {#if Object.keys(formState.languages).length <= 0}
        <div class="pt-10 flex flex-col items-center">
          <div class="text-sm mb-4">Let's get started!</div>
          <div class="text-sm mb-4">
            What's the language code for your resume?
          </div>
          <div class="flex flex-row flex-nowrap gap-1">
            <TextInput
              class="mr-1 w-[40px]"
              placeholder="en"
              bind:value={langCodeToAdd}
            />
            <Button
              disabled={langCodeToAdd.length <= 0 ||
                langCodeToAdd in formState.languages}
              on:click={handleAddLanguage}
            >
              Add
            </Button>
          </div>
        </div>
      {:else}
        <Form class="pt-2">
          <FormSection title="Languages">
            <div class="flex flex-row gap-1 flex-wrap">
              {#each Object.keys(formState.languages) as lang}
                <Button
                  on:click={() => (currentLanguage = lang)}
                  type={currentLanguage === lang ? "default" : "secondary"}
                >
                  {lang}
                </Button>
              {/each}
              {#if langIsAdding}
                <div class="flex flex-row flex-nowrap">
                  <TextInput
                    class="mr-1 w-[40px]"
                    placeholder="en"
                    bind:value={langCodeToAdd}
                  />
                  <Button
                    disabled={langCodeToAdd.length <= 0 ||
                      langCodeToAdd in formState.languages}
                    on:click={handleAddLanguage}
                  >
                    Add
                  </Button>
                  <Button
                    type="secondary"
                    class="ml-2"
                    on:click={() => {
                      langIsAdding = false;
                      langCodeToAdd = "";
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              {:else}
                <Button on:click={() => (langIsAdding = true)} type="secondary">
                  +
                </Button>
              {/if}
            </div>
          </FormSection>
        </Form>
        {#if currentLanguage !== null}
          <ResumeForm bind:formState={formState.languages[currentLanguage]} />
        {/if}
      {/if}
    {:else if sidebarState === "importJSON"}
      <div class="pt-2">
        <Button
          type="secondary"
          class="mb-2"
          on:click={() => (sidebarState = "builder")}>Back</Button
        >
        <p class="text-xs mb-2">Paste your resume data in JSON format here</p>
        <textarea
          placeholder={`{"defaultLanguage":"en","theme":"default","languages":{"en": { ... }}}`}
          class="w-full h-[300px] resize-none font-mono text-[11px] p-2"
          bind:value={jsonToImport}
        />
        <p class="text-xs mb-2">
          This will overwrite all existing data, make sure you have saved your
          current resume.
        </p>
        <Button class="mb-2 w-full" on:click={() => (sidebarState = "builder")}
          >Back</Button
        >
      </div>
    {/if}
  </div>
  <div
    class="duration-200 h-full pt-[40px]"
    style="margin-left: {showSidebar ? sidebarWidth : 0}px;"
  >
    {#if currentLanguage && currentLanguage in formState.languages}
      <ResumePreview resumeData={formState.languages[currentLanguage]} />
    {/if}
  </div>
</div>

<style>
</style>
