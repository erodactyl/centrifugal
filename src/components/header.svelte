<script>
  import { alias, login, signup, logout } from "../data/auth";

  let username = "";
  let password = "";
</script>

<div>
  {#if $alias === null}
    <input bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={() => login(username, password)}>Login</button>
    <button on:click={() => signup(username, password)}>Signup</button>
  {:else}
    <span>@{$alias}</span>
    <button on:click={logout}>Logout</button>
  {/if}
</div>
