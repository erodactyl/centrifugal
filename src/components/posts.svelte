<script>
  import { onMount } from "svelte";
  import { alias } from "../data/auth";
  import { getPosts, addPost, posts } from "../data/posts";
  import Post from "./post.svelte";

  let newPostText = "";

  onMount(() => {
    getPosts();
  });

  const submit = () => {
    addPost(newPostText);
    newPostText = "";
  };
</script>

{#if $alias}
  <div class="new-post">
    <input placeholder="Post" bind:value={newPostText} />
    <button on:click={submit}>Post</button>
  </div>
{:else}
  <p>Log in to add a post.</p>
{/if}

{#each $posts as post (post.time)}
  <Post {post} />
{/each}

<style>
  .new-post {
    display: flex;
    flex-direction: column;
  }
  input {
    margin: 10px 0;
    width: 100%;
  }
  button {
    align-self: flex-end;
  }
</style>
