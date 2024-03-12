<script lang="ts" context="module">
  const buttonTypes = [
    "secondary",
    "default",
    "success",
    "danger",
    "naked",
  ] as const;
  export type ButtonType = (typeof buttonTypes)[number];

  const buttonSizes = {
    default: {
      style: "padding: 0.25rem 0.5rem; font-size: 13px;",
    },
    naked: {
      style: "",
    },
  };
  export type ButtonSize = keyof typeof buttonSizes;
</script>

<script lang="ts">
  export let type: ButtonType = "default";
  export let disabled = false;
  export let id = "";

  export let size: ButtonSize = "default";
</script>

<button
  class={`button flex flex-nowrap items-center justify-center ${type} ${$$restProps.class}`}
  style={`${buttonSizes[size].style}`}
  {disabled}
  {id}
  on:click
>
  <slot name="icon" />
  <slot>Button</slot>
</button>

<style>
  button {
    border-radius: 3px;
  }
  button.default {
    background: #294dd0;
    color: #f7f7f7;

    &:disabled {
      opacity: 0.5;
    }
  }
  button.secondary {
    background: rgba(0, 0, 0, 0.1);
    color: #222;

    &:disabled {
      opacity: 0.5;
    }
  }
  button.success {
    background: #14a014;
    color: #f7f7f7;

    &:disabled {
      opacity: 0.5;
    }
  }
  button.danger {
    background: #c31212;
    color: #f7f7f7;

    &:disabled {
      opacity: 0.5;
    }
  }
  button.naked {
    &:disabled {
      opacity: 0.5;
    }
  }
</style>
