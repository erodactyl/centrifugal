<script>
  import { onMount } from "svelte";
  import { currentChatAlias } from "../data/chat";
  import { gun } from "../data/gun";
  import { Chat } from "../data/chat";

  let messagesData = {};
  let chat;
  let text = "";

  onMount(async () => {
    const partner = await gun.user($currentChatAlias);
    const onMessage = (data) => {
      messagesData[data.time] = data;
    };
    chat = new Chat(partner.epub, onMessage);
  });

  const send = () => {
    chat.sendMessage(text);
    text = "";
  };

  $: messages = Object.values(messagesData).sort((a, b) => a.time - b.time);
</script>

<input bind:value={text} />
<button on:click={send}>Send</button>
<div>
  {#each messages as message}
    <p>{message.message}</p>
  {/each}
</div>
