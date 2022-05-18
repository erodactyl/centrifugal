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
  <h1>Superdecs</h1>
  <input bind:value={newPostText} />
  <button on:click={submit}>Post</button>
{/if}

{#each $posts as post}
  <Post {post} />
{/each}
