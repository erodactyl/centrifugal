import { SEA } from "gun";
import { getPair } from "./auth";
import sha1 from "gun/sea/sha1";
import shim from "gun/sea/shim";
import { gun } from "./gun";
import { writable } from "svelte/store";

const uuid = () => {
  return Math.random().toString().slice(2);
};

const hash = async (data) => {
  const buffer = await sha1(data);
  return shim.Buffer.from(buffer, "binary").toString("hex");
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

  sendMessage = async (message: string) => {
    const time = Date.now();
    const data = { time, message };
    const encryptedData = await SEA.encrypt(data, this.secret);
    gun.get("chat").get(this.hashKey).get(uuid()).put(encryptedData);
  };

  connect = (cb) => {
    gun
      .get("chat")
      .get(this.hashKey)
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
