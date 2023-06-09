browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    var locationArr = window.location.pathname.split("/").reverse()
    if (locationArr[0] && !locationArr[1]) {
        window.location.href = `twitch://stream/${locationArr[0]}`
    } else if (locationArr.includes("videos")) {
        window.location.href = `twitch://video/v${locationArr[0]}${window.location.search}`
    } else if (locationArr.includes("game")) {
        window.location.href = `twitch://game/${locationArr[0]}`
    }
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);
// After page load
afterNavigate();
