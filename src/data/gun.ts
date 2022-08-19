import Gun from "gun";
import "gun/sea";
import "gun/axe";
import "gun/lib/load";

// @ts-ignore Workaround, for some reason reading __global.RELAY_URL in the gun setup directly does not work.
const global = __global;
// @ts-ignore
export const gun = Gun(global.RELAY_URL);
