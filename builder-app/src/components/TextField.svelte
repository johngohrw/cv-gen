<script lang="ts">
  import TextInput from "./TextInput.svelte";

  export let id: string;
  export let label: string;
  export let value: string | undefined;
</script>

<div class="form-field">
  <label class="form-field-label" for={id}>{label}</label>
  <TextInput bind:value placeholder={label} {id} />
</div>
