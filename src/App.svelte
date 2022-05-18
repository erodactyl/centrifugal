<script lang="ts">
  import Header from "./components/header.svelte";
  import Posts from "./components/posts.svelte";
  import "./styles.svelte";
</script>

<main>
  <Header />
  <Posts />
</main>

<style>
  main {
    margin: 0;
    max-width: 900px;
    margin: 0 auto;
  }
  :global(body) {
    background-color: var(--background);
    color: var(--accent-light);
  }
</style>
