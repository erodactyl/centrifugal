<script lang="ts">
  import { scale } from "svelte/transition";
  export let alias: string;
</script>

<img
  transition:scale={{ duration: 150 }}
  src={`https://avatars.dicebear.com/api/bottts/${alias}.svg`}
  alt={`Avatar of ${alias}`}
/>

<style>
  img {
    height: 40px;
    width: 40px;
    border: 1px solid gray;
    border-radius: 100%;
    padding: 5px;
  }
</style>
