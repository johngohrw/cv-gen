<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import EllipsisVertical from "./EllipsisVertical.svelte";

  export let list: any[];
  export let item: any;
  let i: number;
  export { i as index };
</script>

<Dropdown
  buttonProps={{
    type: "naked",
    size: "naked",
    class: "px-0.5 ml-0.5",
  }}
  positionX="right"
  positionY="bottom"
>
  <EllipsisVertical slot="icon" width="14" color="#555" />
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
</Dropdown>
