<script>
  import { onMount } from "svelte";
  import { currentChatAlias } from "../data/chat";
  import { gun } from "../data/gun";
  import { Chat } from "../data/chat";

  let messages = [];
  let chat;
  let text = "";

  onMount(async () => {
    const partner = await gun.user($currentChatAlias);
    const onMessage = (data) => {
      messages[messages.length] = data.message;
    };
    chat = new Chat(partner.epub, onMessage);
  });

  const send = () => {
    chat.sendMessage(text);
    text = "";
  };
</script>

<input bind:value={text} />
<button on:click={send}>Send</button>
<div>
  {#each messages as message}
    <p>{message}</p>
  {/each}
</div>
