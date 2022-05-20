import { SEA } from "gun";
import { writable } from "svelte/store";
import { gun } from "./gun";

export const alias = writable(null);

export const user = gun.user().recall({ sessionStorage: true });

export const sign = (what) => {
  // TODO: Read user.pair() from the proxy
  return SEA.sign(what, JSON.parse(window.sessionStorage.pair));
};

export const getPair = () => {
  return JSON.parse(window.sessionStorage.pair);
};

gun.on("auth", async () => {
  const _alias = await user.get("alias");
  alias.set(_alias);
});

export const login = (username: string, password: string) => {
  gun.user().auth(username, password);
};

export const signup = (username: string, password: string) => {
  gun.user().create(username, password, () => {
    login(username, password);
  });
};

export const logout = () => {
  gun.user().leave();
  alias.set(null);
};
