<script lang="ts">
  import { Menu, Plus, Trash2 } from "lucide-svelte";
  import type {
    Experience,
    Link,
    ResumeData,
    Skill,
    ValidSection,
  } from "../../../types";
  import Button from "../components/Button.svelte";
  import Form from "../components/Form.svelte";
  import FormSection from "../components/FormSection.svelte";
  import TextField from "../components/TextField.svelte";
  import TextInput from "../components/TextInput.svelte";
  import Dropdown from "../components/Dropdown.svelte";

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

  // let formSchema = {
  //   profile: {
  //     type: "object",
  //     name: { type: "string" },
  //     caption: { type: "string" },
  //     location: { type: "string" },
  //     description: { type: "string" },
  //     links: {
  //       type: "array",
  //       of: "object",
  //       shape: {
  //         label: { type: "string" },
  //         href: { type: "string" },
  //         icon: { type: "enum" },
  //       },
  //     },
  //   },
  //   sections: {
  //     type: "array",
  //     of: "object",
  //     shape: {},
  //   },
  // };

  let testname = "";

  let formState: ResumeData = {
    profile: {
      name: "",
      caption: "",
      location: "",
      description: "",
      links: [],
    },
    sections: [],
  };

  let sidebarWidth: number = 360;
  let showSidebar: boolean = true;

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

  const mutateDeepValue = (
    accessor: (string | number)[],
    obj: object,
    newValue: any
  ) => {
    const newObj = { ...obj };
    if (accessor.length <= 1) {
      // @ts-ignore
      newObj[accessor[0]] = newValue;
      return newObj;
    }
    // @ts-ignore
    newObj[accessor[0]] = mutateDeepValue(
      accessor.slice(1),
      // @ts-ignore
      newObj[accessor[0]],
      newValue
    );
    return newObj;
  };
</script>

<div class="h-full relative bg-gray-800">
  <div class="fixed top-0 inset-x-0 h-[40px] bg-gray-100 z-10 flex flex-row">
    <div class="h-full w-full relative">
      <button
        class="flex items-center justify-center aspect-square h-[40px] ml-2"
        on:click={() => (showSidebar = !showSidebar)}
        ><Menu color="#666" /></button
      >
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
    <Form class="pt-2">
      <FormSection title="Profile" class="flex flex-col gap-1">
        <TextInput placeholder="Name" bind:value={formState.profile.name} />
        <TextInput
          placeholder="Caption"
          bind:value={formState.profile.caption}
        />
        <TextInput
          placeholder="Location"
          bind:value={formState.profile.location}
        />
        <TextInput
          placeholder="Description"
          bind:value={formState.profile.description}
        />
      </FormSection>
      <FormSection title="Links" class="">
        {#each formState.profile.links as link, i}
          <div class="flex flex-row bg-black/5 rounded p-2 mb-1">
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
          <div class="flex flex-row bg-black/5 rounded p-2 mb-1">
            <div class="flex flex-col gap-2 flex-grow">
              <TextInput
                class="w-full"
                placeholder="Section Title"
                id={`formState.sections[${i}].title`}
                bind:value={section.title}
              />
              <div class="border-b my-1 border-black/10" />
              {#if section.type === "experienceList"}
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
                        class="flex items-center justify-center text-[12px] py-1 text-gray-400"
                      >
                        No Bullets
                      </div>
                    {/if}
                    {#each experience.items as bullet, k}
                      <div class="pl-3 relative">
                        <div
                          class="absolute left-[-0px] top-[50%] translate-y-[-50%] h-1 w-1 bg-black/20 rounded-full"
                        ></div>
                        <TextInput
                          class="w-full"
                          placeholder="Bullet Point"
                          id={`formState.sections[${i}].data[${j}].items[${k}]`}
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
              {/if}
            </div>
          </div>
        {/each}
        <div class="flex justify-end">
          <Dropdown>
            <button on:click={() => addSection("experience")}>
              Experience Section
            </button>
            <button on:click={() => addSection("skills")}>Skills Section</button
            >
          </Dropdown>
        </div>
      </FormSection>
    </Form>
  </div>
  <div
    class="duration-200 h-full pt-[40px]"
    style="margin-left: {showSidebar ? sidebarWidth : 0}px;"
  >
    <div class="p-8 flex flex-col items-center">
      <h1>Welcome to SvelteKit</h1>
      <p>formstate {JSON.stringify(formState)}</p>
      <p>{testname}</p>
    </div>
  </div>
</div>

<style>
</style>
