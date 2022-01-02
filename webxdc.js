// debug friend: document.writeln(JSON.stringify(value));
window.xdcStorage = (() => {
    var updatesKey = "__xdcUpdatesKey__";
    var fakeStorage = {
        _data: {},

        setItem: function (id, val) {
            return this._data[id] = String(val);
        },

        getItem: function (id) {
            return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
        },

        removeItem: function (id) {
            return delete this._data[id];
        },

        clear: function () {
            return this._data = {};
        }
    };
    var localStorageSupported = () => {
        var testKey = "__xdcTestKey__";
        try {
            var storage = window.localStorage;
            storage.setItem(testKey, "1");
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    };
    var storage = localStorageSupported() ? window.localStorage : fakeStorage;

    return {
        getUpdates: () => {
            var updatesJSON = storage.getItem(updatesKey);
            return updatesJSON ? JSON.parse(updatesJSON) : [];
        },
        saveUpdate: (update) => {
            var updates = window.xdcStorage.getUpdates();
            updates.push(update);
            storage.setItem(updatesKey, JSON.stringify(updates));
        },
        clear: () => {
            storage.clear();
        }
    };
})();

window.webxdc = (() => {
    var updateListener = () => {};

    return {
        selfAddr: () => window.xdcSelfAddr || "device0@local.host",
        selfName: () => window.xdcSelfName || "device0",
        setUpdateListener: (cb) => (window.xdcUpdateListener = cb),
        getAllUpdates: () => {return getXdcRoot().xdcStorage.getUpdates();},
        sendUpdate: (description, payload) => {
            // alert(description+"\n\n"+JSON.stringify(payload));
            var update = {payload: payload};
            getXdcRoot().xdcStorage.saveUpdate(update);
            var all = getAllXdcWindows();
            all.forEach((w) => {
                //alert(w.xdcUpdateListener);
                w.xdcUpdateListener(update);
            });
        },
    };
})();

window.allXdcWindows = [window];
window.xdcUpdateListener = 12;

var styleControlPanel = 'position: fixed; bottom:1em; left:1em; background-color: #000; opacity:0.8; padding:.5em; font-family: sans-serif; width: 50%;color:#fff;';
var styleMenuLink     = 'color:#fff; text-decoration: none;';

function getXdcRoot() {
    var test = window;
    while (typeof test.xdcRoot != 'undefined') {
        test = test.xdcRoot;
    }
    return test;
}

function getAllXdcWindows() {
    var xdcRoot = getXdcRoot();
    return xdcRoot.allXdcWindows;
}

function addXdcPeer() {
    var xdcChild = window.open(window.location);
    var xdcRoot = getXdcRoot();
    xdcChild.xdcRoot = xdcRoot;
    xdcChild.xdcSelfName = "device" + getAllXdcWindows().length;
    xdcChild.xdcSelfAddr = xdcChild.xdcSelfName + "@local.host";
    xdcRoot.allXdcWindows.push(xdcChild);
}

function clearXdcStorage() {
    getXdcRoot().xdcStorage.clear();
    alert("Done.");
}

function alterXdcApp() {
    var title = document.getElementsByTagName('title')[0];
    if (typeof title == 'undefined') {
        title = document.createElement('title');
        document.getElementsByTagName('head')[0].append(title);
    }
    title.innerText = window.webxdc.selfAddr();

    if (getXdcRoot() === window) {
        var div = document.createElement('div');
        div.innerHTML =
            '<div style="' + styleControlPanel + '">' +
            '<a href="javascript:addXdcPeer();" style="' + styleMenuLink + '">Add Peer</a> | ' +
            '<a href="javascript:clearXdcStorage();" style="' + styleMenuLink + '">Clear Storage</a>' +
            '<div>';
        document.getElementsByTagName('body')[0].append(div.firstChild);
    }
}

window.addEventListener("load", alterXdcApp);
