<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Header from "./components/header.svelte";
  import Posts from "./components/posts.svelte";
  import "./styles.svelte";
  import Chat from "./components/chat.svelte";

  export let url = "";
</script>

<main>
  <Router {url}>
    <Header />
    <div>
      <Route path="chat/:pub" component={Chat} />
      <Route path="/" component={Posts} />
    </div>
  </Router>
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
