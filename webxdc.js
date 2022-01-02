// debug friend: document.writeln(JSON.stringify(value));
// maybe helpful: window.sessionStorage, https://www.w3schools.com/html/html5_webstorage.asp

window.webxdc = (() => {
    var updateListener = () => {};

    return {
        selfAddr: () => window.xdcSelfAddr || "device0@local.host",
        selfName: () => window.xdcSelfName || "device0",
        setUpdateListener: (cb) => (window.xdcUpdateListener = cb),
        getAllUpdates: () => {
            return JSON.parse(
                '[]'
                //'[{"action":"configure", "question":"your favorite colorxx", "answers":["red","green","blue","yellow","purple1"]},{"action":"vote", "sender":"foo2@bar.de", "vote":0},{"action":"vote", "sender":"foo@bar.de", "vote":0}]'
            );
        },
        sendUpdate: (description, payload) => {
            // alert(description+"\n\n"+JSON.stringify(payload));
            var all = getAllXdcWindows();
            all.forEach((w) => {
                //alert(w.xdcUpdateListener);
                w.xdcUpdateListener({payload: payload});
            });
        },
    };
})();

window.allXdcWindows = [window];
window.xdcUpdateListener = 12;

var styleControlPanel = 'position: fixed; bottom:1em; left:1em; background-color: #000; opacity:0.8; padding:.5em; font-family: sans-serif; width: 50%;';
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

function addPeer() {
    var xdcChild = window.open(window.location);
    var xdcRoot = getXdcRoot();
    xdcChild.xdcRoot = xdcRoot;
    xdcChild.xdcSelfName = "device" + getAllXdcWindows().length;
    xdcChild.xdcSelfAddr = xdcChild.xdcSelfName + "@local.host";
    xdcRoot.allXdcWindows.push(xdcChild);
}

function alterApp() {
    var title = document.getElementsByTagName('title')[0];
    if (typeof title == 'undefined') {
	title = document.createElement('title');
	document.getElementsByTagName('head')[0].append(title);
    }
    title.innerText = window.webxdc.selfAddr();

    if (getXdcRoot() == window) {
	var div = document.createElement('div');
	div.innerHTML =
            '<div style="' + styleControlPanel + '">' +
            '<a href="javascript:addPeer();" style="' + styleMenuLink + '">Add Peer</a>' +
            '<div>';
	document.getElementsByTagName('body')[0].append(div.firstChild);
    }
}

window.addEventListener("load", alterApp);
