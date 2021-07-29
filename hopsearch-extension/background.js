chrome.runtime.onInstalled.addListener(() => {
    fetch('https://hopsearch-extension.herokuapp.com/').then(res => res.json()).then(data => {
        if (data != null && data.length !== 0) {
            for (let pair of data)
                chrome.storage.sync.set(pair);
        }
        console.log('HopSearch sync complete.');
    }).catch((err) => {
        console.log("HopSearch couldn't, please try again. :/");
        sendResponse(false);
    });
}); 