<script lang="ts">
  import { scale } from "svelte/transition";
  export let alias: string;
</script>

<img
  src={`https://avatars.dicebear.com/api/bottts/${alias}.svg`}
  transition:scale={{ duration: 150 }}
  alt={`Avatar of ${alias}`}
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
