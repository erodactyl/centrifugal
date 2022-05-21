import { SEA } from "gun";
import sha1 from "gun/sea/sha1";
import shim from "gun/sea/shim";

/**
Alice wants to talk to Bob. Alice wants the messages to be encrypted.
On top of that, Alice doesn't want the network to know that she is talking to Bob.
Ignoring the networking steps (anyone running a relay can know who is sending the message),
we want to figure out how to hide this information in an ideal instant db-synced world.
Alice can generate a Secret using her private key and Bob's public key. Bob can also generate the same Secret
using his private key and Alice's public key. They can then encrypt messages using this key and be the only ones
who can read them.

However, this does not solve the problem of metadata encryption. We can't store the messages list under
/chat/alice-bob, because then everyone on the network will know that Alice and Bob are talking, how much they are talking,
and how big the messages are. Instead, we can use the hash of the Secret as the key to the chat.
If we have the messages under /chat/[Hash<Secret>], the whole world can still know that messages are going back and forth,
but can't know from who or to whom.

This system will work if Alice and Bob know in advance that they want to chat. However, it can't let Alice
know if Bob sends her a message that she does not expect, (as she will not have a listener on the hash of the secret).
We will solve that problem next.

Chat [id: hash of the Secret] {
  message: Encrypted<message, Secret>
}
*/

const hash = async (data) => {
  const buffer = await sha1(data);
  return shim.Buffer.from(buffer, "binary").toString("hex");
};

const getDbWithMessage = async (alice, bobEpub, text) => {
  const secret = await SEA.secret(bobEpub, alice);
  const key = await hash(secret);
  const encryptedMessage = await SEA.encrypt(text, secret);
  return { [key]: encryptedMessage };
};

const decryptMessage = async (bob, aliceEpub, db) => {
  const secret = await SEA.secret(aliceEpub, bob);
  const key = await hash(secret);
  const encryptedMessage = db[key];
  const message = await SEA.decrypt(encryptedMessage, secret);
  return message;
};

const main = async () => {
  const alice = await SEA.pair();
  const bob = await SEA.pair();

  // Alice has her keys and Bob's public key
  const db = await getDbWithMessage(alice, bob.epub, "Hello Bob");

  // Bob hsa his keys and Alice's public key
  const message = await decryptMessage(bob, alice.epub, db);

  console.log(message);

  const bob_secret = await SEA.secret(alice.epub, bob);
};

main();
