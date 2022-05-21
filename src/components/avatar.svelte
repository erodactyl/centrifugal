<script lang="ts">
  import { scale } from "svelte/transition";
  import { currentChatAlias } from "../data/chat";
  export let user: { pub?: string; alias: string };
</script>

<img
  src={`https://avatars.dicebear.com/api/bottts/${user.alias}.svg`}
  transition:scale={{ duration: 150 }}
  alt={`Avatar of ${user.alias}`}
  on:click={() => currentChatAlias.set(user.pub)}
/>

<style>
  img {
    height: 40px;
    width: 40px;
    border: 1px solid var(--accent);
    border-radius: 100%;
    padding: 5px;
    background-color: #fff;
  }
</style>
