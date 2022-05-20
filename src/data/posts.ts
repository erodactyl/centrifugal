import Gun, { SEA } from "gun";
import { derived, writable } from "svelte/store";
import { sign, user } from "./auth";
import { gun } from "./gun";

export interface IPost {
  sender: string;
  text: string;
  time: number;
}

const postsStore = writable<IPost[]>([]);

export const posts = derived(postsStore, ($postsStore) => {
  return Object.values($postsStore).sort((a, b) => b.time - a.time);
});

export const addPost = async (text: string) => {
  const time = Date.now().toString();
  const details = await sign({ time, text });
  gun.get("posts").get(time).put({ details, pub: user.is.pub });
};

export const getPosts = () => {
  gun
    .get("posts")
    .map()
    .on(async (_post) => {
      const { pub, details: _details } = _post;
      const details = await SEA.verify(_details, { pub });
      const sender = await gun.user(pub);
      const post = {
        // @ts-ignore
        sender: sender.alias,
        text: details.text,
        time: parseInt(details.time),
      };
      postsStore.update((_ps) => ({ ..._ps, [details.time]: post }));
    });
};
