<script lang="ts">
  import { Link } from "svelte-routing";

  import { scale } from "svelte/transition";
  export let user: { pub?: string; alias: string };
</script>

<Link to={`chat/${user.pub}`}>
  <img
    src={`https://avatars.dicebear.com/api/bottts/${user.alias}.svg`}
    transition:scale={{ duration: 150 }}
    alt={`Avatar of ${user.alias}`}
  />
</Link>

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
