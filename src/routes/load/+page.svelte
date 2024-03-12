<script>
  import { goto } from "$app/navigation";
  import Button from "../../components/Builder/Button.svelte";
  import TextInput from "../../components/Builder/TextInput.svelte";
  import LandingLayout from "../../components/LandingLayout.svelte";

  let url = "";
  const handleLoad = () => {
    goto("/?data=" + url);
  };
</script>

<LandingLayout>
  <div class="flex mb-4 justify-start w-full">
    <a href="/">Back to Home</a>
  </div>
  <section
    class="flex flex-col items-center justify-center px-4"
    style="min-height: calc(100vh - 100px)"
  >
    <div class="flex flex-col items-center mb-12">
      <div class="font-bold text-3xl text-gray-200">
        Load an Existing Resume
      </div>
    </div>

    <div class="flex flex-col items-center gap-2 mb-4 w-full">
      <p>Please provide the URL to a valid cv-gen JSON export</p>
    </div>

    <div class="flex flex-row gap-4 w-full">
      <TextInput
        bind:value={url}
        class="text-black"
        placeholder="https://link.to/your/export.json"
      />
      <Button
        on:click={handleLoad}
        disabled={url.length <= 0}
        class="px-4 py-1 bg-green-500/50 rounded whitespace-nowrap"
      >
        Load Resume
      </Button>
    </div>
  </section>
</LandingLayout>
