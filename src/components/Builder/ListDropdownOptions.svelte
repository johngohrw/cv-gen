<script lang="ts">
  import EllipsisDropdown from "./EllipsisDropdown.svelte";

  export let list: any[];
  export let item: any;
  let i: number;
  export { i as index };
</script>

<EllipsisDropdown>
  <button
    disabled={i <= 0}
    on:click={() => {
      const tmp = list[i - 1];
      list[i - 1] = list[i];
      list[i] = tmp;
    }}
  >
    Move Up
  </button>
  <button
    disabled={i >= list.length - 1}
    on:click={() => {
      const tmp = list[i + 1];
      list[i + 1] = list[i];
      list[i] = tmp;
    }}
  >
    Move Down
  </button>
  <button
    on:click={() => {
      list = [...list].filter((o) => o !== item);
    }}
  >
    Delete
  </button>
</EllipsisDropdown>
