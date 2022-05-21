<script lang="ts">
  import Header from "./components/header.svelte";
  import Posts from "./components/posts.svelte";
  import "./styles.svelte";
  import { currentChatAlias } from "./data/chat";
  import Chat from "./components/chat.svelte";
</script>

<main>
  <Header />
  {#if $currentChatAlias}
    <Chat />
  {:else}
    <Posts />
  {/if}
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
