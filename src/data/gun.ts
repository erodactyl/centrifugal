import Gun from "gun";
import "gun/sea";
// import "gun/axe";
import "gun/lib/load";

// TODO: put the link in config
export const gun = Gun("http://localhost:8000/gun");
// https://centrifugal.herokuapp.com/gun
