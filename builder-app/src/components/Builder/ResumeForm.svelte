<script lang="ts">
  import { Plus } from "lucide-svelte";
  import {
    type Experience,
    type Link,
    type ResumeData,
    type Skill,
    type ValidSection,
  } from "../../../../types";
  import Button from "./Button.svelte";
  import Dropdown from "./Dropdown.svelte";
  import EllipsisVertical from "./EllipsisVertical.svelte";
  import Form from "./Form.svelte";
  import FormSection from "./FormSection.svelte";
  import TextInput from "./TextInput.svelte";
  import SelectInput from "./SelectInput.svelte";
  import type { Theme } from "../../types";
  import theme from "../../themes/default";
  import { themes } from "../../themes";

  export let formState: ResumeData;

  let currentTheme: Theme =
    themes[Object.keys(themes)[0] as keyof typeof themes];

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
    <!-- <TextInput placeholder="Location" bind:value={formState.profile.location} />
    <TextInput
      placeholder="Description"
      bind:value={formState.profile.description}
    /> -->
  </FormSection>
  <FormSection title="Links" class="">
    {#each formState.profile.links as link, i}
      <div class="flex flex-row bg-black/5 rounded p-2 mb-2">
        <div class="flex flex-col gap-1 flex-grow">
          <div class="flex flex-row flex-nowrap gap-1">
            <TextInput
              class="w-full"
              placeholder="Label"
              id={`formState.profile.links[${i}].label`}
              bind:value={formState.profile.links[i].label}
            />
            <SelectInput
              bind:value={formState.profile.links[i].icon}
              placeholder="Icon"
            >
              {#each Object.entries(currentTheme.icons) as [name, icon], i}
                <option value={icon}>{name}</option>
              {/each}
            </SelectInput>
          </div>

          <TextInput
            class="w-full"
            placeholder="URL"
            id={`formState.profile.links[${i}].href`}
            bind:value={formState.profile.links[i].href}
          />
        </div>
        <Dropdown
          buttonProps={{
            type: "naked",
            size: "naked",
            class: "px-0.5 ml-0.5",
          }}
          positionX="right"
          positionY="bottom"
        >
          <EllipsisVertical slot="icon" width="14" color="#555" />
          <button
            on:click={() => {
              formState.profile.links = [...formState.profile.links].filter(
                (o) => o !== link
              );
            }}
          >
            Delete
          </button>
        </Dropdown>
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
          <div class="flex flex-row flex-nowrap">
            <TextInput
              class="w-full"
              placeholder="Section Title"
              id={`formState.sections[${i}].title`}
              bind:value={section.title}
            />
            <Dropdown
              buttonProps={{
                type: "naked",
                size: "naked",
                class: "px-0.5 ml-0.5",
              }}
              positionX="right"
              positionY="bottom"
            >
              <EllipsisVertical slot="icon" width="14" color="#555" />
              <button
                on:click={() => {
                  formState.sections = [...formState.sections].filter(
                    (o) => o !== section
                  );
                }}
              >
                Delete
              </button>
            </Dropdown>
          </div>

          {#if section.type === "experienceList"}
            <div class="border-b my-1 border-black/10" />
            {#each section.data as experience, j}
              <div class="flex flex-col gap-1 p-3 bg-black/5 rounded-lg">
                <div class="flex flex-row flex-nowrap">
                  <TextInput
                    class="w-full"
                    placeholder="Title"
                    id={`formState.sections[${i}].data[${j}].title`}
                    bind:value={experience.title}
                  />
                  <Dropdown
                    buttonProps={{
                      type: "naked",
                      size: "naked",
                      class: "px-0.5 ml-0.5",
                    }}
                    positionX="right"
                    positionY="bottom"
                  >
                    <EllipsisVertical slot="icon" width="14" color="#555" />
                    <button
                      on:click={() => {
                        // @ts-ignore
                        section.data = [...section.data].filter(
                          (o) => o !== experience
                        );
                      }}
                    >
                      Delete
                    </button>
                  </Dropdown>
                </div>
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
                  <div class="flex mb-2 flex-row flex-nowrap">
                    <div class="mt-2 mx-1.5 h-1 w-1 bg-black/20 rounded-full" />
                    <textarea
                      class="w-full text-xs rounded-[2px] mb-[-6px] p-1"
                      placeholder="Bullet text"
                      bind:value={bullet}
                    />
                    <Dropdown
                      buttonProps={{
                        type: "naked",
                        size: "naked",
                        class: "px-0.5 ml-0.5",
                      }}
                      positionX="right"
                      positionY="bottom"
                    >
                      <EllipsisVertical slot="icon" width="14" color="#555" />
                      <button
                        on:click={() => {
                          experience.items = [...experience.items].filter(
                            (o) => o !== bullet
                          );
                        }}
                      >
                        Delete
                      </button>
                    </Dropdown>
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
                <Dropdown
                  buttonProps={{
                    type: "naked",
                    size: "naked",
                    class: "px-0.5 ml-0.5",
                  }}
                  positionX="right"
                  positionY="bottom"
                >
                  <EllipsisVertical slot="icon" width="14" color="#555" />
                  <button
                    on:click={() => {
                      // @ts-ignore
                      section.data = [...section.data].filter(
                        (o) => o !== skill
                      );
                    }}
                  >
                    Delete
                  </button>
                </Dropdown>
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
