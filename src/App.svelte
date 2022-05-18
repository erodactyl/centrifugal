<script lang="ts">
  import Header from "./components/header.svelte";
  import Posts from "./components/posts.svelte";
</script>

<main>
  <Header />
  <Posts />
</main>

<style>
  main {
    max-width: 900px;
    margin: 0 auto;
  }
</style>
