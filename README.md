# [Decentralized feed app](https://centrifugal.erikdavtyan.com/) built with GunJS and Svelte

Decentralized technologies are the future, but we can already start implementing them today.
This application is a proof of concept that a fully decentralized clone of "your favorite feed app" can be built already. It does not use a blockchain, there are no fees for posting things.

## Graph database

The database that's in the core of this app is decentralized. The data is saved in a graph database in every browser that uses this app and syncs between them. Some browsers may have only partial representations of the graph (the part that they need for using the app). For the sake of constant availability there are relay servers set up. They don't have any extra control over the data - they simply keep it so you can access the app even when nobody else is running it or if that particular portion of the graph is unavailable. The relay server keeps the data backed up and ready to go.

## Authentication

You can log in securely - the application will generate a public/private key pair for you, encrypt it with your passphrase, and save it in the graph database accross the network. You will be the only one able to decrypt your key pair using your passphrase. As the db is decentralized, there is no way to request a passphrase change - so please do not forget it.

## Posting

Even though there are no centralized entities, basic verifications mechanisms are still in place. When writing a post, reply, or simply leaving a like - those objects are signed with your private key. Nobody else will be able to tamper with your post - because the signature will be verifiably wrong if they try.

## P2P E2E chat

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

## Experimental

This application is experimental - use it at your own risk. Both GunJS (the decentralized database) and Svelte (the frontend framework) were new to me before starting the project, so any feedback is greatly appreciated.
