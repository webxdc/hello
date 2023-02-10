# Hello

Sample project with a simple implementation of the webxdc read and write APIs.


## Demo (no server or installation required)

1. Open `index.html` in your web browser
2. Click 'Add Peer' to open as many peers as you like
3. Type a message and press 'Send' to see the update in each peer. (For Safari you might need to check the setting under Develop > Disable Local File Restrictions.)


## Developing webxdc apps

Simply copy `webxdc.js` from this repo beside your `index.html` and you are ready to go
to **develop and test your app in most browsers.**

Bundle your app using `./create-xdc.sh your-app-name`
and **send it to your friends** 🙂

<img width="311" alt="Screenshot 2023-02-10 at 20 40 22" src="https://user-images.githubusercontent.com/9800740/218183018-59d0aa06-da92-445b-9cad-51e416594d31.png">


## Further Hints and Troubleshooting


### Limitations

Due to the nature of most browsers and how they scope `localStorage`,
each emulated peer will get the same `localStorage`.

To really test the storage usage of your Webxdc,
bundle the app and test it in Delta Chat directly
where all peers get their own `localStorage`.
Alternatively, use the more advanced [webxdc-dev](https://github.com/webxdc/webxdc-dev) tool.


### Type-checking and completion

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

### Developing in Safari

To use the devtool in safari you need to disable the local file restrictions
under `Develop` -> `Disable Local File Restrictions`.

After doing this you can use the dev tool simulator.

Make sure to reload (`Cmd + R`) all simulator tabs/windows to apply this setting.
Without this option `Add Peer` seems to work (it opens a new instance), but **the instances will not be able to communicate**.


### Developing on Android

- install Termux
- install Python and Git in Termux
- `git clone` the devtool repo or your fork of it
- use `python -m http.server` to serve it for development using nano/vim
- when you are done, use `./create-xdc.sh` for bundling
- copy the created `.xdc` file to a location from where you can access and send it via Delta Chat
- pro tip: you can create symbolic link to a folder in the external storage
