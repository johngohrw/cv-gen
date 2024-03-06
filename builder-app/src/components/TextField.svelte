<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined;
</script>

<div class="form-field">
  <label class="form-field-label" for={id}>{label}</label>
  <input
    type="text"
    class="form-field-text"
    bind:value
    placeholder={label}
    {id}
  />
</div>

<style>
  .form-field-text {
    padding: 0.1rem 0.5rem;
    border-radius: 2px;
  }
</style>
