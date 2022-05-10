# webxdc Hello

## Demo (no server or installation required)

1. Open `index.html`
2. Click 'Add Peer' to open as many peers as you like
3. Type a message and press 'Send' to see the update in each peer. (For Safari you might need to check the setting under Develop > Disable Local File Restrictions.)

## Developing webxdc apps

Simply copy `webxdc.js` from this repo beside your `index.html` and you are ready to go.

Bundle your app using `./create-xdc.sh your-app-name`
and send it to your friends :)

*Note:* the API is still under development and
this is just a proof-of-concept for now.

## Type-checking and completion

If you are using VSCode you can have autocompletion and type-checking even without using TypeScript by adding these two lines to your JavaScript source files:

```js
//@ts-check
/** @typedef {import('./webxdc').Webxdc} Webxdc */
```

Without VSCode you need to install TypeScript and then run the check manually.

```sh
npm -g typescript
tsc --noEmit --allowJs --lib es2015,dom webxdc.js # to check if types and simulator are in sync
tsc --noEmit --allowJs --lib es2015,dom your_js_file.js
```
