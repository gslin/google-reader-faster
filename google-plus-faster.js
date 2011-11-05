(function(){
    var filter = function(req){
        console.log('Blocking! ' + req.url);
        return {cancel: true};
    };

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        if (changeInfo.url) {
            console.log('changeInfo.url! ' + changeInfo.url);

            if (-1 == changeInfo.url.indexOf('http://www.google.com/reader/') &&
                -1 == changeInfo.url.indexOf('https://www.google.com/reader/')) {
                chrome.experimental.webRequest.onBeforeRequest.removeListener(filter);
            } else {
                chrome.experimental.webRequest.onBeforeRequest.addListener(
                    filter,
                    {tabId: tabId, urls: ['https://plusone.google.com/*']},
                    ['blocking']
                );
            }
        }
    });
})();
