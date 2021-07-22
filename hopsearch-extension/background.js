// const syncInterval = 60000;  // millis
// let lastSync;

// chrome.runtime.onMessage.addListener((request, sendResponse) => {
//     // console.log('Job started.');
//     // const currTime = Date.now();
//     // if (request.cmd === 'sync') {
//     //     if (currTime - lastSync <= syncInterval) {
//     //         console.log("Skipping this sync request as it hasn't been long since the last.");
//     //         return;
//     //     }
//     //     console.log("Performing sync ...");
//     //     fetch('http://localhost:3000/').then((res) => {
//     //         console.log('API call done.');
//     //         sendResponse({
//     //             msg: 'Sync done!'
//     //         });
//     //     })
//     // }
//     // console.log('Job ended.');
//     sendResponse({
//         msg: 'Sync done!'
//     });
// });