<script lang="ts">
  const buttonTypes = {
    secondary: {
      style: "background: rgba(0, 0, 0, 0.1); color: #222; border-radius: 3px;",
    },
    default: {
      style: "background: #294dd0; color: #f7f7f7; border-radius: 3px;",
    },
    success: {
      style: "background: #14a014; color: #f7f7f7; border-radius: 3px;",
    },
    danger: {
      style: "background: #c31212; color: #f7f7f7; border-radius: 3px;",
    },
  };
  type ButtonType = keyof typeof buttonTypes;
  export let type: ButtonType = "default";

  const buttonSizes = {
    default: {
      style: "padding: 0.25rem 0.5rem; font-size: 13px;",
    },
  };
  type ButtonSize = keyof typeof buttonSizes;
  export let size: ButtonSize = "default";
</script>

<button
  class={`flex flex-nowrap items-center justify-center ${$$restProps.class}`}
  style={`${buttonTypes[type].style} ${buttonSizes[size].style}`}
  on:click
>
  <slot name="icon" />
  <slot>Button</slot>
</button>
