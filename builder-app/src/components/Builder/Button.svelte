<script lang="ts">
  const buttonTypes = ["secondary", "default", "success", "danger"] as const;
  type ButtonType = (typeof buttonTypes)[number];
  export let type: ButtonType = "default";
  export let disabled = false;

  const buttonSizes = {
    default: {
      style: "padding: 0.25rem 0.5rem; font-size: 13px;",
    },
  };
  type ButtonSize = keyof typeof buttonSizes;
  export let size: ButtonSize = "default";
</script>

<button
  class={`button flex flex-nowrap items-center justify-center ${type} ${$$restProps.class}`}
  style={`${buttonSizes[size].style}`}
  {disabled}
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
  }
  button.success {
    background: #14a014;
    color: #f7f7f7;
  }
  button.danger {
    background: #c31212;
    color: #f7f7f7;
  }
</style>
