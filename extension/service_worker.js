var wikiIdentifier = 'wikipedia.org/wiki'
var grokiIdentifier = 'grokipedia.com/page'
var igIdentifier = 'infogalactic.com/info'
var redirectedArray = {}

function replace_url (url, wikipedia_fragment, infogalactic_fragment) {
  return url.replace(new RegExp('https:\\/\\/(|en\\.|www\\.)' + wikipedia_fragment), 'https://' + infogalactic_fragment)
};

chrome.action.onClicked.addListener(
  function (tab) {
    chrome.tabs.query(
      {active: true, currentWindow: true},
      function (tabs) {
        var activeTab = tabs[0]
        var currentURL = activeTab.url
        redirectedArray[activeTab.id] = 'disallowRedirect'

        if (currentURL.includes(wikiIdentifier)) {
          var grokiURL = replace_url(currentURL, wikiIdentifier, grokiIdentifier)
          return chrome.tabs.update({'url': grokiURL})
        }

        if (currentURL.includes(grokiIdentifier)) {
          var igURL = currentURL.replace(grokiIdentifier, igIdentifier)
          return chrome.tabs.update({'url': igURL})
        }

        if (currentURL.includes(igIdentifier)) {
          var wikiURL = currentURL.replace(igIdentifier, wikiIdentifier)
          return chrome.tabs.update({'url': wikiURL})
        }
      })
  }
)

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url && changeInfo.url.includes(wikiIdentifier)) {
    if (!(tabId in redirectedArray)) {
      redirectedArray[tabId] = 'allowRedirect';
    }
    if (redirectedArray[tabId] === 'allowRedirect') {
      var grokiURL = replace_url(changeInfo.url, wikiIdentifier, grokiIdentifier);
      chrome.tabs.update(tabId, {url: grokiURL});
    }
  } else if (changeInfo.status === 'complete') {
    if (!tab.url.includes(wikiIdentifier) && !tab.url.includes(grokiIdentifier) && !tab.url.includes(igIdentifier)) {
      redirectedArray[tabId] = 'allowRedirect';
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  delete redirectedArray[tabId];
});