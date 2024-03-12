<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let id = "";
</script>

<select
  {...$$restProps}
  class={`form-field-select w-full ${value.length === 0 ? "unselected" : ""} ${$$restProps.class}`}
  bind:value
  {placeholder}
  {id}
>
  {#if placeholder.length > 0}
    <option value="" disabled selected hidden>{placeholder}</option>
  {/if}
  <slot />
</select>

<style>
  .form-field-select {
    padding: 0.2rem 0.2rem;
    border-radius: 4px;
    box-shadow: 0 0 10px -2px rgba(0, 0, 0, 0.1) inset;
    border: 1px solid #dcdcdc;
  }
  .form-field-select.unselected {
    color: #999;
  }
</style>
