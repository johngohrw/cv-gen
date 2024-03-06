<script lang="ts">
  import { ArrowDownToDotIcon, Menu, MenuIcon, Plus } from "lucide-svelte";
  import type {
    ResumeData,
    ValidSection,
    Experience,
    Skill,
    Link,
  } from "../../../types";
  import Form from "../components/Form.svelte";
  import TextField from "../components/TextField.svelte";
  import Button from "../components/Button.svelte";

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

  let sidebarWidth: number = 300;
  let showSidebar: boolean = true;

  const handleFormChange = (accessorArray: string[], newValue: any) => {
    formState = mutateDeepValue(
      accessorArray,
      formState,
      newValue
    ) as ResumeData;
  };

  const addSection = (type: keyof typeof sectionTemplateMap) => {
    const template = sectionTemplateMap[type];
    formState = { ...formState, sections: [...formState.sections, template] };
  };

  const mutateDeepValue = (accessor: string[], obj: object, newValue: any) => {
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
  <div class="relative pt-[40px]">
    <div
      class="flex flex-col gap-3 fixed bg-gray-300 h-full duration-200 p-2 overflow-auto"
      style="width: {sidebarWidth}px; left: {showSidebar ? 0 : -sidebarWidth}px"
    >
      <Form>
        <TextField
          label="Name"
          id="profile.name"
          bind:value={formState.profile.name}
        />
        <TextField
          label="Caption"
          id="profile.caption"
          bind:value={formState.profile.caption}
        />
        <TextField
          label="Description"
          id="profile.description"
          bind:value={formState.profile.description}
        />
        <div class="flex flex-row">
          <Button type="secondary" on:click={() => addSection("experience")}>
            <Plus size={18} class="mr-1" slot="icon" />
            Add Section
          </Button>
        </div>
      </Form>
    </div>
    <div
      class="duration-200"
      style="margin-left: {showSidebar ? sidebarWidth : 0}px"
    >
      <h1>Welcome to SvelteKit</h1>
      <p>formstate {JSON.stringify(formState)}</p>
      <p>{testname}</p>
    </div>
  </div>
</div>

<style>
</style>
