<script lang="ts">
  import { onMount } from "svelte";
  let element: HTMLDivElement;
  export let duration: number = 500;
  onMount(() => {
    setTimeout(() => {
      element.style.setProperty("opacity", "1");
    }, 10);
  });
</script>

<div
  class={$$restProps.class}
  style={`opacity: 0; transition-duration: ${duration}ms`}
  bind:this={element}
>
  <slot />
</div>
