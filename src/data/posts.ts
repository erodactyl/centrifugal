import Gun, { SEA } from "gun";
import { derived, writable } from "svelte/store";
import { user } from "./auth";
import { gun } from "./gun";

const postsStore = writable([]);

export const posts = derived(postsStore, ($postsStore) => {
  return Object.values($postsStore).sort((a, b) => a.time - b.time);
});

export const addPost = async (text: string) => {
  const time = Date.now();
  // const signedText = await SEA.sign(text, getPair());
  const userPost = user.get("all").set({ what: text });
  const index = time.toString();
  gun.get("posts").get(index).put(userPost);
};

export const getPosts = () => {
  gun
    .get("posts")
    .map()
    .on(async (_post, id) => {
      const sender = await gun.user(_post);
      // const text = await SEA.verify(_post.what, { pub: sender.pub });
      // @ts-ignore
      const time = Gun.state.is(_post, "what");
      const post = {
        // @ts-ignore
        sender: sender.alias,
        text: _post.what,
        time,
        id,
      };
      postsStore.update((_ps) => ({ ..._ps, [id]: post }));
    });
};
