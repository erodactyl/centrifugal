<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import { alias } from "../data/auth";

  import { scale } from "svelte/transition";
  export let user: { pub?: string; alias: string };

  const open = async () => {
    if ($alias) {
      navigate(`chat/${user.pub}`);
    }
  };
</script>

<img
  src={`https://avatars.dicebear.com/api/bottts/${user.alias}.svg`}
  transition:scale={{ duration: 150 }}
  alt={`Avatar of ${user.alias}`}
  on:click={open}
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
