# Webxdc Development Tool

this is a little tool to make development of webxdc apps easier.

for developing webxdc apps,
just copy the `webxdc.js` from this repo beside
your `index.html` and you are ready to go.

no server or installation required.

- include your `webxdc.js` to your `index.html` as usual
- open your `index.html` from your local disk in your browser,
  (tested with Firefox and Chrome, for Safari, enable "Develop / Disable Local File Restrictions")
- the emulation layer will add an "add peer" button,
  open as many peers as you like
- once you call sendUpdate() in on peer,
  all peers will get the update with their update listeners.

when your app is done, you can bundle it using `./create-xdc.sh your-app-name`
and send it to your friends :)

note, that the api is not yet complete,
this is just a, maybe already useful, proof-of-concept for now.
