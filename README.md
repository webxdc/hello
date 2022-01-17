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

## use type-checking and completion

If you are using vscode you can have autocompletion and type-checking even without using typescript.

just add these two lines to your javascript source files:

```js
//@ts-check
/** @typedef {import('./webxdc').WEBxDC} WEBxDC */
```

Without vscode you need to install typescript and then run the check manually.

```sh
npm -g typescript
tsc --noEmit --allowJs --lib es2015,dom webxdc.js # to check if types and simulator are in sync
tsc --noEmit --allowJs --lib es2015,dom your_js_file.js
```
