console.log("HopSearch is alive on this page.");

// setInterval(() => {
//     //
// }, )

let pressedA = false;

window.addEventListener('keydown', (e) => {
    console.log(`Pressed in content: ${e.code}`);
    if (e.code.startsWith('Alt')) pressedA = true;
});
window.addEventListener('keyup', async (e) => {
    console.log(`Released in content: ${e.code}`);
    if (e.code.startsWith('Alt')) pressedA = false;
    if (e.code === 'Slash' && pressedA) {
        console.log('Key-combo matched, getting config for this website ...');
        chrome.storage.local.get(getDomain(window.location.href), function (result) {
            if (result == null || Object.keys(result).length === 0) {
                console.log('Ah, no config yet. :/');
                return;
            }
            let elementSelector = result[getDomain(window.location.href)];
            console.log(`Got it all! Triggering focus on "${elementSelector}"`);
            let selectorType = elementSelector.charAt(0);
            let selectorName = elementSelector.substring(1);
            switch (selectorType) {
                case '.': document.getElementsByClassName(selectorName)[0].focus(); break;
                case '#': document.getElementById(selectorName).focus(); break;
                default: console.log(`Bad selector "${elementSelector}". :/`);
            }
        });

        // switch (getDomain(location.href)) {
        //     case 'www.vocabulary.com':
        //         document.getElementById('search').focus();
        //         break;
        //     case 'forum.xda-developers.com':
        //         document.getElementsByClassName('uix_searchDropdown__trigger')[0].focus();
        //         break;
        // }
        // console.log('Hey! We are there!');
    }
});

function getDomain(href) {
    const s = href.substring(href.indexOf('//') + 2, href.indexOf('/', href.indexOf('//') + 2));
    return s;
}