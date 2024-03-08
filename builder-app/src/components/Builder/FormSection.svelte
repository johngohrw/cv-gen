<script lang="ts">
  export let title: string;
</script>

<div class={`mb-4 ${$$restProps.class}`}>
  <div class="uppercase font-semibold text-[14px] mb-2">
    {title}
  </div>
  <slot />
</div>
