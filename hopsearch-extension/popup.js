// vars
let tab;
let mustLocate = true;
let cacheButtonText;

chrome.tabs.query({ active: true, currentWindow: true }).then(res => {
    [tab] = res;
    document.getElementById('field-url').innerHTML = getDomain(tab.url);
    updateSelectorOfThisTab();
    // update extension status
    toggleStatus();
});
// console.log("Loaded.");

// let keystrokeObserver = document.getElementById('keystrokeObserver');

// keystrokeObserver.addEventListener('click', async () => {
//     console.log("Clicked.");
//     let [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     });

//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: listenForKeystrokes
//     });
// });

// function listenForKeystrokes() {
//     console.log("Hi!");
//     window.addEventListener('keydown', (e) => {
//         console.log(`Pressed: ${e.code}`);
//     });
// }

// document.getElementById('button-save').addEventListener('click', () => {
//     let newConfig = {};
//     newConfig[getDomain(tab.url)] = document.getElementById('field-selector').innerHTML;
//     chrome.storage.sync.set(newConfig);
//     alert('Saved!');
// });

// document.getElementById('button-debug').addEventListener('click', () => {
//     chrome.storage.sync.clear();
//     alert('Forgotten all websites.');
// });

document.getElementById('button-sync').addEventListener('click', () => {
    // chrome.runtime.sendMessage({ cmd: "sync" }, function (response) {
    //     console.log(`Did sync complete? And: "${response.msg}"`);
    // });
    document.getElementById('button-sync').innerHTML = "Loading ...";
    document.getElementById('button-sync').setAttribute('disabled', true);
    chrome.tabs.sendMessage(tab.id, 'sync', function (response) {
        // updateSelectorOfThisTab();
    });
});

document.getElementById('button-pause').focus();  // enables user to Alt+H and spacebar to quickly enable / disable
document.getElementById('button-pause').addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, 'toggle-pause', function (response) {
        toggleStatus();
    });
});

Array.from(document.getElementsByClassName('button-locate')).forEach((elem) => {
    elem.addEventListener('click', () => {
        if (mustLocate) {
            cacheButtonText = elem.innerHTML;
            elem.innerHTML = "Now click on the search-box ...";
            chrome.tabs.sendMessage(tab.id, 'locate-search', function (response) {
                // console.log(response);
            });
        } else {
            elem.innerHTML = cacheButtonText;
            chrome.tabs.sendMessage(tab.id, 'locate-search-stop', function (response) {
                // console.log(response);
            });
        }
        mustLocate = !mustLocate;
    });
});

document.getElementById('button-copy').addEventListener('click', () => {
    chrome.storage.sync.get(null, items => {
        navigator.clipboard.writeText(JSON.stringify(items)).then(() => {
            // alert('Copied config!');
        })
    });
});

document.getElementById('link-profile').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'https://www.linkedin.com/in/thegeekylad/'
    });
});

document.getElementById('button-contribute').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'https://github.com/theGeekyLad/hopsearch-extension/blob/master/CONTRIBUTING.md'
    });
});

// document.onreadystatechange = function() {
//     if (document.readyState === 'complete') {
//         document.getElementById('field-url').innerHTML = 'hi';
//     }
// }

function getDomain(href) {
    const s = href.substring(href.indexOf('//') + 2, href.indexOf('/', href.indexOf('//') + 2));
    console.log(s);
    return s;
} 1

function updateSelectorOfThisTab() {
    chrome.storage.sync.get(getDomain(tab.url), function (result) {
        if (result == null || Object.keys(result).length === 0) {
            document.getElementById('found-field').setAttribute('hidden', true);
            document.getElementById('not-found-field').removeAttribute('hidden');
            document.getElementsByClassName('btn-link-find')[0].setAttribute('hidden', true);
            document.getElementsByClassName('btn-find')[0].removeAttribute('hidden');
        }
        else
            document.getElementById('field-selector').innerHTML = result[getDomain(tab.url)];
    });
}

function toggleStatus() {
    chrome.tabs.sendMessage(tab.id, 'get-status', function (response) {
        const buttonStatus = document.getElementById('button-pause');
        if (response) {
            buttonStatus.innerHTML = 'Active';
            buttonStatus.classList.remove('btn-danger');
            buttonStatus.classList.add('btn-success');
        } else {
            buttonStatus.innerHTML = 'Paused';
            buttonStatus.classList.remove('btn-success');
            buttonStatus.classList.add('btn-danger');
        }
    });
}
