<script lang="ts">
  import { fade } from "svelte/transition";
  import formatDistance from "date-fns/formatDistance";
  import { toggleLike, IPost, addPost } from "../data/posts";
  import Avatar from "./avatar.svelte";

  export let post: IPost;

  let replyText = "";

  const reply = () => {
    addPost(replyText, post.id);
    replyText = "";
  };
</script>

<div transition:fade={{ duration: 200 }} class="container">
  <div class="header">
    <Avatar alias={post.sender} />
    <div class="info">
      <p class="alias">@{post.sender}</p>
      <p class="sent">{formatDistance(post.time, Date.now())}</p>
    </div>
  </div>
  <p>{post.text}</p>
  <button on:click={() => toggleLike(post.id)}>Like</button>
  <p>Likes: {post.likes}</p>
  <div class="reply">
    <input bind:value={replyText} />
    <button on:click={reply}>Reply</button>
  </div>
  {#if post.replies.length}
    <h2 class="replies-header">Replies</h2>
    <div class="replies">
      {#each post.replies as reply (reply.id)}
        <div class="reply">
          <div class="header">
            <Avatar alias={reply.sender} />
            <div class="info">
              <p class="alias">@{reply.sender}</p>
              <!-- <p class="sent">{formatDistance(reply.time, Date.now())}</p> -->
            </div>
          </div>
          <p>{reply.text}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 900px;
    margin: 20px 0;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid var(--accent);
    background-color: var(--background-light);
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }
  p {
    margin: 5px;
  }
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .replies-header {
    margin-left: 20px;
  }
  .replies {
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid var(--accent);
  }
  .reply {
    margin-bottom: 20px;
    border-bottom: 1px solid var(--accent);
  }
</style>
