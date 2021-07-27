let tab;
chrome.tabs.query({ active: true, currentWindow: true }).then(res => {
    [tab] = res;
    document.getElementById('field-url').innerHTML = getDomain(tab.url);
    updateSelectorOfThisTab();
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

document.getElementById('button-save').addEventListener('click', () => {
    let newConfig = {};
    newConfig[getDomain(tab.url)] = document.getElementById('field-selector').innerHTML;
    chrome.storage.local.set(newConfig);
    alert('Saved!');
});

document.getElementById('button-debug').addEventListener('click', () => {
    chrome.storage.local.clear();
    alert('Forgotten all websites.');
});

document.getElementById('button-sync').addEventListener('click', () => {
    // chrome.runtime.sendMessage({ cmd: "sync" }, function (response) {
    //     console.log(`Did sync complete? And: "${response.msg}"`);
    // });
    fetch('http://localhost:3000').then(res => res.json()).then(data => {
        if (data != null && data.length !== 0) {
            for (let pair of data)
                chrome.storage.local.set(pair);
            updateSelectorOfThisTab();
            alert('Updated!');
        }
    })
});

document.getElementById('button-pause').addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, 'toggle-pause', function (response) {
        console.log(response);
    });
    alert('Toggled pause once.');
});

document.getElementById('button-locate').addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, 'locate-search', function (response) {
        // console.log(response);
    });
});

document.getElementById('button-copy').addEventListener('click', () => {
    chrome.storage.local.get(null, items => {
        navigator.clipboard.writeText(JSON.stringify(items)).then(() => {
            alert('Copied config!');
        })
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
}

function updateSelectorOfThisTab() {
    chrome.storage.local.get(getDomain(tab.url), function (result) {
        if (result == null || Object.keys(result).length === 0) return;
        document.getElementById('field-selector').innerHTML = result[getDomain(tab.url)];
    });
}
