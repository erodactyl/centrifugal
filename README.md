# Decentralized feed app built with GunJS and Svelte

Decentralized technologies are the future, but we can already start implementing them today.
This application is a proof of concept that a fully decentralized clone of "your favorite feed app" can be build already. It does not use a blockchain, there are no fees for posting things.

## Graph database

The database that's in the core of this app is decentralized. The data is saved in a graph database in every browser that uses this app and syncs between them. Some browsers may have only partial representations of the graph (the part that they need for using the app). For the sake of constant availability there are relay servers set up. They don't have any extra control over the data - they simply keep it so you can access the app even when nobody else is running it or if that particular portion of the graph is unavailable. The relay server keeps the data backed up and ready to go.

## Authentication

You can log in securely - the application will generate a public/private key pair for you, encrypt it with your passphrase, and save it in the graph database accross the network. You will be the only one able to decrypt your key pair using your passphrase. As the db is decentralized, there is no way to request a passphrase change - so please do not forget it.

## Posting

Even though there are no centralized entities, basic verifications mechanisms are still in place. When writing a post, reply, or simply leaving a like - those objects are signed with your private key. Nobody else will be able to tamper with your post - because the signature will be verifiably wrong if they try.

## Experimental

This application is experimental - use it at your own risk. Both GunJS (the decentralized database) and Svelte (the frontend framework) were new to me before starting the project, so any feedback is greatly appreciated.
