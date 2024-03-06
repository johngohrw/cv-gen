<script lang="ts">
  import { Plus } from "lucide-svelte";
  import Button from "./Button.svelte";

  let showDropdown: boolean = false;

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    showDropdown = false;
  };
</script>

<div
  class={`relative ${$$restProps.class}`}
  on:focusout={handleDropdownFocusLoss}
>
  <Button type="secondary" on:click={() => (showDropdown = true)}>
    <Plus size={18} class="mr-1" slot="icon" />
    Add Section
  </Button>
  {#if showDropdown}
    <button
      on:click={() => (showDropdown = false)}
      class="dropdown-list absolute top-[100%] right-0 w-fit flex flex-col items-start py-1 rounded shadow-lg bg-gray-100 text-gray-900 text-[12px] whitespace-nowrap"
    >
      <slot />
    </button>
  {/if}
</div>

<style>
  .dropdown-list :global(button) {
    padding: 0.3rem 0.5rem;
    width: 100%;
    text-align: left;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .dropdown-list :global(button:not(:last-child)) {
    border-bottom: 1px solid #ddd;
  }
</style>
