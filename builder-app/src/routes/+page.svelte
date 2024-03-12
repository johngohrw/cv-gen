<script lang="ts">
  import { getSearchParams } from "@/url";
  import { onMount } from "svelte";
  import FadeIn from "../components/FadeIn.svelte";
  import LandingLayout from "../components/LandingLayout.svelte";
  import Message from "../components/Message.svelte";
  import ResumePreview from "../components/ResumePreview.svelte";
  import Welcome from "../components/Welcome.svelte";
  import type { InputData, ResumeData } from "../types";

  let inputData: InputData;
  let resumeData: ResumeData;
  let isLoadingResume: boolean = true;
  let message: string = "Loading...";
  $: messageIsShowing = !resumeData && isLoadingResume;

  const setMessage = (msg: string) => {
    message = msg;
  };

  onMount(() => {
    setMessage("Checking data source...");
    const searchParams = getSearchParams();
    let { data: dataSourceURL } = searchParams ?? {};

    if (dataSourceURL) {
      loadResume(dataSourceURL);
    } else {
      setMessage("No valid data source found.");
      setTimeout(() => {
        isLoadingResume = false;
      }, 100);
    }
  });

  const loadResume = async (url: string) => {
    setMessage("Fetching resume data from URL...");
    const data = (await (await fetch(url)).json()) ?? null;
    setMessage("Checking fetched data...");
    inputData = data;
  };

  $: if (inputData) {
    setMessage("Preparing to display resume...");
    const { defaultLanguage, languages } = inputData ?? {};
    const langKeys = languages ? Object.keys(languages) : [];
    const hasDefaultLanguage = defaultLanguage && defaultLanguage in languages;

    if (langKeys.length > 0) {
      resumeData =
        languages[hasDefaultLanguage ? defaultLanguage : langKeys[0]];
    } else {
      setMessage(
        "Can't find any languages in your resume, it seems to be empty!"
      );
    }
  }
</script>

<div class="h-full overflow-auto">
  {#if resumeData}
    <ResumePreview {inputData} />
  {:else if !isLoadingResume}
    <FadeIn class="h-full">
      <LandingLayout>
        <Welcome />
      </LandingLayout>
    </FadeIn>
  {/if}
  <Message
    style={`
        opacity: ${messageIsShowing ? 1 : 0}; 
        transition-delay: 200ms; 
        transition-duration: 200ms; 
        pointer-events: none
    `}
  >
    {message}
  </Message>
</div>

<style>
  :global(:root) {
    --background-color: #444;
  }
  :global(body) {
    background: var(--background-color);
  }
</style>
