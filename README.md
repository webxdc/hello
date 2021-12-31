# w30 development tool

this is a little tool to make development of w30 apps easier.

for developing w30 apps,
just copy the `deltachat.js` from this repo beside
your `index.html` and you are ready to go.

no server or installation required.

- include your `deltachat.js` to your `index.html` as usual
- open your `index.html` from your local disk in your browser,
  tested with Firefox.
- the emulation layer will add an "add peer" button,
  open as many peers as you like
- once you call sendUpdate() in on peer,
  all peers will get the update with their update listeners.

keep in mind, when bundling your w30 app, deltachat.js is not needed,
it will be provided by the target implementation.

note, that the api is not yet complete,
this is just a, maybe already useful, proof-of-concept for now.


