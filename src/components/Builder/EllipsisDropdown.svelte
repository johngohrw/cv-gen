<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import EllipsisVertical from "./EllipsisVertical.svelte";
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
  <slot />
</Dropdown>
