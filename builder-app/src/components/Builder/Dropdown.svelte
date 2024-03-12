<script lang="ts">
  import Button, { type ButtonSize, type ButtonType } from "./Button.svelte";

  let showDropdown: boolean = false;
  type DirectionX = "left" | "right";
  type DirectionY = "top" | "bottom";
  export let positionX: DirectionX = "right";
  export let positionY: DirectionY = "bottom";

  export let buttonProps: { [key: string]: any } & Partial<{
    type: ButtonType;
    size: ButtonSize;
  }> = {
    type: "secondary",
    size: "default",
  };

  const handleDropdownFocusLoss = ({
    relatedTarget,
    currentTarget,
  }: {
    relatedTarget: any;
    currentTarget: any;
  }) => {
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
  <Button on:click={() => (showDropdown = true)} {...buttonProps}>
    <slot name="icon" />
    <slot name="label" />
  </Button>
  {#if showDropdown}
    <button
      on:click={() => (showDropdown = false)}
      class="dropdown-list absolute w-fit flex flex-col items-start py-1 rounded shadow-lg bg-gray-100 text-gray-900 text-[12px] whitespace-nowrap z-20"
      style={`${positionX}: 0; ${positionY === "top" && "bottom: 100%;"} ${positionY === "bottom" && "top: 100%;"}`}
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

    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  .dropdown-list :global(button:not(:last-child)) {
    border-bottom: 1px solid #ddd;
  }
</style>
