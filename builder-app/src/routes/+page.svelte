<script lang="ts">
  import type { ResumeData, ValidSection, Experience } from "../../../types";

  let experienceSectionTemplate: ValidSection = {
    title: "",
    data: [],
    type: "experienceList",
  };

  let experienceDataTemplate: Experience = {
    title: "",
    subtitle: "",
    location: "",
    date: "",
    items: [],
  };

  // type TypeName<T> = T extends string
  //   ? "string"
  //   : T extends number
  //     ? "number"
  //     : T extends boolean
  //       ? "boolean"
  //       : T extends undefined
  //         ? "undefined"
  //         : T extends Function
  //           ? "function"
  //           : "object";

  // type Fields<Shape> = Record<Shape>;
  // type Schema<Shape> = Record<"fields", Fields<Shape>> &
  //   Record<"type", TypeName<Shape>>;

  let formSchema: Schema<ResumeData> = {
    fields: {
      profile: {
        name: "string",
        caption: "string",
        location: "string",
        description: "string",
        links: [],
      },
      sections: [],
    },
    type: "object",
  };

  const handleFormChange = () => {};
</script>

<div class="page-container">
  <div class="builder-header">header</div>
  <div class="builder-content">
    <h1>Welcome to SvelteKit</h1>
    <button on:click={() => {}}>huh</button>

    <p>formstate {JSON.stringify(formState)}</p>
  </div>
</div>

<style>
  .page-container {
    height: 100%;
    position: relative;
    background: red;
  }

  .builder-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #333;
    height: 40px;
  }

  .builder-content {
    position: relative;
    padding-top: 40px;
  }
</style>
