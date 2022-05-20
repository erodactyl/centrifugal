import Gun, { SEA } from "gun";
import { derived, writable } from "svelte/store";
import { sign, user } from "./auth";
import { gun } from "./gun";

export interface IPost {
  sender: string;
  text: string;
  time: number;
  id: string;
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

export const toggleLike = async (id: string) => {
  const time = Date.now().toString();
  const like = await sign({ id, time });
  const pub = user.is.pub;
  gun.get("posts").get(id).get("likes").get(pub).put({ like, pub });
};

const getLikes = (id: string) => {
  return new Promise<any[]>((res) => {
    gun.get(`posts/${id}/likes`).load(async (data) => {
      const _likes = await Promise.all(
        Object.values(data).map(({ like, pub }) => SEA.verify(like, { pub }))
      );
      const likes = _likes
        .filter((_l) => _l.id === id)
        .map((_l) => ({
          ..._l,
        }));
      res(likes);
    });
  });
};

export const getPosts = () => {
  gun
    .get("posts")
    .map()
    .on(async (_post, id) => {
      const { pub, details: _details } = _post;
      const likes = await getLikes(id);
      const details = await SEA.verify(_details, { pub });
      const sender = await gun.user(pub);
      const post = {
        // @ts-ignore
        sender: sender.alias,
        text: details.text,
        time: parseInt(details.time),
        id: details.time,
        likes: likes.length,
      };
      postsStore.update((_ps) => ({ ..._ps, [details.time]: post }));
    });
};
