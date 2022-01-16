// debug friend: document.writeln(JSON.stringify(value));
window.webxdc = (() => {
    var updateListener = () => {};
    var updatesKey = "__xdcUpdatesKey__";
    window.addEventListener('storage', (event) => {
        if (event.key == null) {
            window.location.reload();
        } else if (event.key === updatesKey) {
            var updates = JSON.parse(event.newValue);
            var update = updates[updates.length-1];
            console.log("[Webxdc] " + JSON.stringify(update));
            updateListener(update);
        }
    });

    return {
        selfAddr: () => {
            var params = new URLSearchParams(window.location.hash.substr(1));
            return params.get("addr") || "device0@local.host";
        },
        selfName: () => {
            var params = new URLSearchParams(window.location.hash.substr(1));
            return params.get("name") || "device0";
        },
        setUpdateListener: (cb) => (updateListener = cb),
        getAllUpdates: () => {
            var updatesJSON = window.localStorage.getItem(updatesKey);
            return updatesJSON ? JSON.parse(updatesJSON) : [];
        },
        sendUpdate: (update, description) => {
            // alert(description+"\n\n"+JSON.stringify(payload));
            update = {payload: update.payload, summary: update.summary, info: update.info}
            console.log('[Webxdc] description="' + description + '", ' + JSON.stringify(update));
            updateListener(update);
            var updatesJSON = window.localStorage.getItem(updatesKey);
            var updates = updatesJSON ? JSON.parse(updatesJSON) : [];
            updates.push(update);
            window.localStorage.setItem(updatesKey, JSON.stringify(updates));
        },
    };
})();

window.addXdcPeer = () => {
    var loc = window.location;
    // get next peer ID
    var params = new URLSearchParams(loc.hash.substr(1));
    var peerId = Number(params.get("next_peer")) || 1;

    // open a new window
    var peerName = "device" + peerId;
    var url = loc.protocol + "//" + loc.host + loc.pathname + "#name=" + peerName + "&addr=" + peerName + "@local.host";
    window.open(url);

    // update next peer ID
    params.set("next_peer", peerId + 1);
    window.location.hash = "#" + params.toString();
}

window.clearXdcStorage = () => {
    window.localStorage.clear();
    window.location.reload();
}

window.alterXdcApp = () => {
    var styleControlPanel = 'position: fixed; bottom:1em; left:1em; background-color: #000; opacity:0.8; padding:.5em; font-family: sans-serif; color:#fff; z-index: 9999';
    var styleMenuLink = 'color:#fff; text-decoration: none; vertical-align: middle';
    var styleAppIcon = 'height: 1.5em; width: 1.5em; margin-right: 0.5em; border-radius:10%; vertical-align: middle';
    var title = document.getElementsByTagName('title')[0];
    if (typeof title == 'undefined') {
        title = document.createElement('title');
        document.getElementsByTagName('head')[0].append(title);
    }
    title.innerText = window.webxdc.selfAddr();

    if (window.webxdc.selfName() === "device0") {
        var div = document.createElement('div');
        div.innerHTML =
            '<div style="' + styleControlPanel + '">' +
            '<a href="javascript:window.addXdcPeer();" style="' + styleMenuLink + '">Add Peer</a>' +
            '<span style="' + styleMenuLink + '"> | </span>' +
            '<a href="javascript:window.clearXdcStorage();" style="' + styleMenuLink + '">Clear Storage</a>' +
            '<div>';
        var controlPanel = div.firstChild;

        function loadIcon(name) {
            var tester = new Image();
            tester.onload = () => {
                div.innerHTML = '<img src="' + name + '" style="' + styleAppIcon +'">';
                controlPanel.insertBefore(div.firstChild, controlPanel.firstChild);
            };
            tester.src = name;
        }
        loadIcon("icon.png");
        loadIcon("icon.jpg");

        document.getElementsByTagName('body')[0].append(controlPanel);
    }
}

window.addEventListener("load", window.alterXdcApp);
