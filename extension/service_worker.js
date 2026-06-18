var wikiIdentifier = 'wikipedia.org/wiki'
var grokiIdentifier = 'grokipedia.com/page'
var igIdentifier = 'infogalactic.com/info'
var redirectedArray = {}

function isWikipedia(url) {
  return /^https:\/\/(?:en\.|www\.)?wikipedia\.org\/wiki\//.test(url);
}

function isGrokipedia(url) {
  return url.includes('grokipedia.com/page');
}

function isInfogalactic(url) {
  return url.includes('infogalactic.com/info');
}

function replace_url (url, wikipedia_fragment, infogalactic_fragment) {
  return url.replace(new RegExp('https:\\/\\/(|en\\.|www\\.)' + wikipedia_fragment), 'https://' + infogalactic_fragment)
};

chrome.action.onClicked.addListener(function(tab) {
  var currentURL = tab.url
  redirectedArray[tab.id] = 'disallowRedirect'

  if (isWikipedia(currentURL)) {
    var grokiURL = replace_url(currentURL, wikiIdentifier, grokiIdentifier)
    chrome.tabs.update(tab.id, {url: grokiURL})
  }

  if (isGrokipedia(currentURL)) {
    var igURL = currentURL.replace(grokiIdentifier, igIdentifier)
    chrome.tabs.update(tab.id, {url: igURL})
  }

  if (isInfogalactic(currentURL)) {
    var wikiURL = currentURL.replace(igIdentifier, wikiIdentifier)
    chrome.tabs.update(tab.id, {url: wikiURL})
  }
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url && isWikipedia(changeInfo.url)) {
    if (!(tabId in redirectedArray)) {
      redirectedArray[tabId] = 'allowRedirect';
    }
    if (redirectedArray[tabId] === 'allowRedirect') {
      var grokiURL = replace_url(changeInfo.url, wikiIdentifier, grokiIdentifier);
      chrome.tabs.update(tabId, {url: grokiURL});
    }
  } else if (changeInfo.status === 'complete') {
    if (!isWikipedia(tab.url) && !isGrokipedia(tab.url) && !isInfogalactic(tab.url)) {
      redirectedArray[tabId] = 'allowRedirect';
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  delete redirectedArray[tabId];
});