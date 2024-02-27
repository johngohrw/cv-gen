<script lang="ts">
  let x = 0;

  const handleClick = () => {
    x += 1;
  };
</script>

<div class="page-container">
  <div class="builder-header">header</div>
  <div class="builder-content">
    <h1>Welcome to SvelteKit</h1>
    d
    <button on:click={handleClick}></button>
    <p></p>
  </div>
</div>

<style>
  .page-container {
    height: 100%;
    position: relative;
  }

  .builder-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #333;
    height: 40px;
  }

  .builder-content {
    position: relative;
    padding-top: 40px;
  }
</style>
