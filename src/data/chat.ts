import { SEA } from "gun";
import { getPair } from "./auth";
import hash from "sha1";
import { gun } from "./gun";
import { writable } from "svelte/store";

const uuid = () => {
  return Math.random().toString().slice(2);
};

export class Chat {
  secret: string;
  hashKey: string;
  constructor(epub: string, cb: Function) {
    this.start(epub, cb);
  }

  start = async (epub: string, cb) => {
    this.secret = await SEA.secret(epub, getPair());
    this.hashKey = await hash(this.secret);
    this.connect(cb);
  };

  chat = () => {
    return gun.get("chat").get(this.hashKey);
  };

  sendMessage = async (message: string) => {
    const time = Date.now();
    const data = { time, message };
    const encryptedData = await SEA.encrypt(data, this.secret);
    this.chat().get(uuid()).put(encryptedData);
  };

  connect = (cb) => {
    this.chat()
      .map()
      .on(async (encryptedMessage) => {
        console.log(encryptedMessage);
        const data = await SEA.decrypt(encryptedMessage, this.secret);
        // console.log(data);
        cb(data);
      });
  };
}

export const currentChatAlias = writable<string | null>(null);
