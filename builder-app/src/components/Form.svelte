<div class={`form ${$$restProps.class}`}>
  <slot />
</div>

<style>
  .form :global(.form-field) {
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 0.5rem;
  }
  .form :global(.form-field-label) {
    font-size: 14px;
    margin-bottom: 0.15rem;
  }
  .form :global(input) {
    font-size: 15px;
  }
</style>
