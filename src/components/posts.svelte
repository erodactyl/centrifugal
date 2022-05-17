<script>
  import { onMount } from "svelte";
  import { getPosts, addPost, posts } from "../data/posts";

  let newPostText = "";

  onMount(() => {
    getPosts();
  });

  // $: console.log($posts);
</script>

<h1>Superdecs</h1>
<input bind:value={newPostText} />
<button on:click={() => addPost(newPostText)}>Post</button>

<ul>
  {#each $posts as post}
    <li>
      <bold>{post.sender}: {post.text}</bold>
    </li>
  {/each}
</ul>
