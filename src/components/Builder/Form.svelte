<div class={`form ${$$restProps.class}`}>
  <slot />
</div>

<style>
  .form :global(.form-field) {
    display: flex;
    flex-flow: column nowrap;
  }

  .form :global(.form-field):not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .form :global(.form-field-label) {
    font-size: 13px;
    color: #222;
    margin-bottom: 0.15rem;
  }

  .form :global(input),
  .form :global(select) {
    font-size: 12px;
  }
</style>
