<script lang="ts">
  import { alias, login, signup, logout } from "../data/auth";
  import Avatar from "./avatar.svelte";
  import Fixes from "./fixes.svelte";

  let username = "";
  let password = "";
</script>

{#if $alias === null}
  <div>
    <input bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <br />
    <button on:click={() => login(username, password)}>Login</button>
    <button on:click={() => signup(username, password)}>Signup</button>
  </div>
{:else}
  <div class="info">
    <p class="alias">@{$alias}</p>
    <Avatar user={{ alias: $alias }} />
    <button class="logout" on:click={logout}>Logout</button>
  </div>
{/if}
<Fixes />

<style>
  .info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .alias {
    margin-right: 10px;
  }
  .logout {
    margin-left: 10px;
  }
</style>
