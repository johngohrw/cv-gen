<script lang="ts">
  import Form from "./Form.svelte";
  import FormSection from "./FormSection.svelte";
  import TextInput from "./TextInput.svelte";
  import {
    type Experience,
    type ResumeData,
    type Skill,
    type ValidSection,
    type Link,
  } from "../../../types";
  import Button from "./Button.svelte";
  import Dropdown from "./Dropdown.svelte";
  import { Plus, Trash2 } from "lucide-svelte";

  export let formState: ResumeData;

  let experienceSectionTemplate: ValidSection = {
    title: "",
    data: [],
    type: "experienceList",
  };

  let skillSectionTemplate: ValidSection = {
    title: "",
    data: [],
    type: "skillList",
    labels: { low: "rarely", high: "often" },
  };

  let sectionTemplateMap = {
    experience: experienceSectionTemplate,
    skills: skillSectionTemplate,
  };

  let experienceDataTemplate: Experience = {
    title: "",
    subtitle: "",
    location: "",
    date: "",
    items: [],
  };

  let skillDataTemplate: Skill = {
    name: "",
    level: 1,
  };
  let contactLinkTemplate: Link = {
    label: "",
    href: "",
    icon: "",
  };

  const addSection = (type: keyof typeof sectionTemplateMap) => {
    const template = { ...sectionTemplateMap[type] };
    formState = { ...formState, sections: [...formState.sections, template] };
  };

  const addContactLink = () => {
    const template = { ...contactLinkTemplate };
    formState.profile.links = [...formState.profile.links, template];
  };

  const addExperienceItem = (index: number) => {
    const template = { ...experienceDataTemplate };
    // @ts-ignore
    formState.sections[index].data = [
      ...formState.sections[index].data,
      template,
    ];
  };

  const addSkillItem = (index: number) => {
    const template = { ...skillDataTemplate };
    // @ts-ignore
    formState.sections[index].data = [
      ...formState.sections[index].data,
      template,
    ];
  };

  const addExperienceBulletItem = (
    sectionIndex: number,
    experienceIndex: number
  ) => {
    const existingItems = [
      ...(formState.sections[sectionIndex].data[experienceIndex] as Experience)
        .items,
    ];
    (
      formState.sections[sectionIndex].data[experienceIndex] as Experience
    ).items = [...existingItems, ""];
  };
</script>

<Form class={$$restProps.class}>
  <FormSection title="Profile" class="flex flex-col gap-1">
    <TextInput placeholder="Name" bind:value={formState.profile.name} />
    <TextInput placeholder="Caption" bind:value={formState.profile.caption} />
    <TextInput placeholder="Location" bind:value={formState.profile.location} />
    <TextInput
      placeholder="Description"
      bind:value={formState.profile.description}
    />
  </FormSection>
  <FormSection title="Links" class="">
    {#each formState.profile.links as link, i}
      <div class="flex flex-row bg-black/5 rounded p-2 mb-2">
        <div class="flex flex-col gap-1 flex-grow">
          <TextInput
            class="w-full"
            placeholder="Label"
            id={`formState.profile.links[${i}].label`}
            bind:value={formState.profile.links[i].label}
          />
          <TextInput
            class="w-full"
            placeholder="URL"
            id={`formState.profile.links[${i}].href`}
            bind:value={formState.profile.links[i].href}
          />
        </div>
        <div class="ml-2">
          <Button
            type="danger"
            class="h-[24px]"
            on:click={() => {
              formState.profile.links = [
                ...formState.profile.links.slice(0, i),
                ...formState.profile.links.slice(i + 1),
              ];
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    {/each}
    <div class="flex justify-end">
      <Button type="secondary" on:click={addContactLink}>
        <Plus size={18} class="mr-1" slot="icon" />
        Add Link
      </Button>
    </div>
  </FormSection>

  <FormSection title="Sections" class="">
    {#each formState.sections as section, i}
      <div
        class="flex flex-row bg-white/30 rounded p-2 mb-4 border border-gray-300 shadow"
      >
        <div class="flex flex-col gap-2 flex-grow">
          <TextInput
            class="w-full"
            placeholder="Section Title"
            id={`formState.sections[${i}].title`}
            bind:value={section.title}
          />

          {#if section.type === "experienceList"}
            <div class="border-b my-1 border-black/10" />
            {#each section.data as experience, j}
              <div class="flex flex-col gap-1 p-3 bg-black/5 rounded-lg">
                <TextInput
                  class="w-full"
                  placeholder="Title"
                  id={`formState.sections[${i}].data[${j}].title`}
                  bind:value={experience.title}
                />
                <TextInput
                  class="w-full"
                  placeholder="Subtitle"
                  id={`formState.sections[${i}].data[${j}].subtitle`}
                  bind:value={experience.subtitle}
                />
                <div class="flex flex-row gap-1">
                  <TextInput
                    class="w-full"
                    placeholder="Location"
                    id={`formState.sections[${i}].data[${j}].location`}
                    bind:value={experience.location}
                  />
                  <TextInput
                    class="w-full"
                    placeholder="Date"
                    id={`formState.sections[${i}].data[${j}].date`}
                    bind:value={experience.date}
                  />
                </div>
                {#if experience.items.length <= 0}
                  <div
                    class="flex items-center justify-center text-[12px] py-2 text-gray-400"
                  >
                    No Bullets
                  </div>
                {/if}
                {#each experience.items as bullet, k}
                  <div class="pl-3 relative">
                    <div
                      class="absolute left-[2px] top-[9px] h-1 w-1 bg-black/20 rounded-full"
                    ></div>
                    <textarea
                      class="w-full text-xs rounded-[2px] mb-[-6px] p-1"
                      placeholder="Bullet text"
                      bind:value={bullet}
                    />
                  </div>
                {/each}
                <div class="flex justify-end">
                  <Button
                    type="secondary"
                    on:click={() => addExperienceBulletItem(i, j)}
                  >
                    Add Bullet
                  </Button>
                </div>
              </div>
            {/each}
            <Button type="secondary" on:click={() => addExperienceItem(i)}>
              Add Experience
            </Button>
          {:else if section.type === "skillList"}
            <div class="flex flex-row flex-nowrap gap-1">
              <TextInput
                class="w-full"
                placeholder="rarely"
                bind:value={section.labels.low}
              />
              <TextInput
                class="w-full"
                placeholder="often"
                bind:value={section.labels.high}
              />
            </div>
            <div class="border-b my-1 border-black/10" />
            {#each section.data as skill}
              <div class="relative flex flex-row flex-nowrap">
                <TextInput
                  class="w-full"
                  placeholder="Skill"
                  bind:value={skill.name}
                />
                <input
                  type="number"
                  bind:value={skill.level}
                  class="w-[32px] text-center bg-transparent"
                />
                <input
                  bind:value={skill.level}
                  class="w-[100px]"
                  type="range"
                  min={1}
                  max={5}
                />
              </div>
            {/each}
            <Button type="secondary" on:click={() => addSkillItem(i)}>
              Add Skill
            </Button>
          {/if}
        </div>
      </div>
    {/each}
    <div class="flex justify-end">
      <Dropdown>
        <Plus size={18} class="mr-1" slot="icon" />
        <span slot="label">Add Section</span>
        <button on:click={() => addSection("experience")}>
          Experience Section
        </button>
        <button on:click={() => addSection("skills")}>Skills Section</button>
      </Dropdown>
    </div>
  </FormSection>
</Form>
