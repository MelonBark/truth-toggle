var WIKIPEDIA_PATH = 'wikipedia.org/wiki';
var GROKIPEDIA_PATH = 'grokipedia.com/page';
var WIKIPEDIA_URL_PATTERN = /^https:\/\/(?:en\.|www\.)?wikipedia\.org\/wiki\//;

var tabRedirectState = {};

var REDIRECT_ALLOW = 'allowRedirect';
var REDIRECT_DISALLOW = 'disallowRedirect';

function isWikipedia(url) {
  return WIKIPEDIA_URL_PATTERN.test(url);
}

function isGrokipedia(url) {
  return url.indexOf(GROKIPEDIA_PATH) !== -1;
}

function isEncyclopediaUrl(url) {
  return isWikipedia(url) || isGrokipedia(url);
}

function toGrokipediaUrl(url) {
  return url.replace(WIKIPEDIA_URL_PATTERN, 'https://' + GROKIPEDIA_PATH + '/');
}

function toWikipediaUrl(url) {
  return url.replace(GROKIPEDIA_PATH, WIKIPEDIA_PATH);
}

function setRedirectState(tabId, state) {
  tabRedirectState[tabId] = state;
}

function clearRedirectState(tabId) {
  delete tabRedirectState[tabId];
}

function shouldAutoRedirect(tabId) {
  return tabRedirectState[tabId] !== REDIRECT_DISALLOW;
}

chrome.action.onClicked.addListener(function(tab) {
  var currentUrl = tab.url;

  if (!currentUrl) {
    return;
  }

  setRedirectState(tab.id, REDIRECT_DISALLOW);

  if (isWikipedia(currentUrl)) {
    chrome.tabs.update(tab.id, { url: toGrokipediaUrl(currentUrl) });
    return;
  }

  if (isGrokipedia(currentUrl)) {
    chrome.tabs.update(tab.id, { url: toWikipediaUrl(currentUrl) });
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url && isWikipedia(changeInfo.url)) {
    if (!(tabId in tabRedirectState)) {
      setRedirectState(tabId, REDIRECT_ALLOW);
    }

    if (shouldAutoRedirect(tabId)) {
      chrome.tabs.update(tabId, { url: toGrokipediaUrl(changeInfo.url) });
    }

    return;
  }

  if (changeInfo.status === 'complete' && tab.url && !isEncyclopediaUrl(tab.url)) {
    setRedirectState(tabId, REDIRECT_ALLOW);
  }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  clearRedirectState(tabId);
});