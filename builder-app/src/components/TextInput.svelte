<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let id = "";
</script>

<input
  {...$$restProps}
  type="text"
  class={`form-field-text w-full ${$$restProps.class}`}
  bind:value
  {placeholder}
  {id}
/>

<style>
  .form-field-text {
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
  }
</style>
