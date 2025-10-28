var wikiIdentifier = 'wikipedia.org/wiki'
var grokiIdentifier = 'grokipedia.com'
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
          var wikiURL = currentURL.replace(grokiIdentifier, wikiIdentifier)
          return chrome.tabs.update({'url': wikiURL})
        }

        if (currentURL.includes(igIdentifier)) {
          var wikiURL = currentURL.replace(igIdentifier, wikiIdentifier)
          return chrome.tabs.update({'url': wikiURL})
        }
      })
  }
)

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (!(details.tabId in redirectedArray)) {
      redirectedArray[details.tabId] = 'allowRedirect'
    }
    if (redirectedArray[details.tabId] === 'allowRedirect') {
      return {
        redirectUrl: replace_url(details.url, wikiIdentifier, grokiIdentifier)
      }
    }
  },
  {urls: ['*://*.wikipedia.org/*'], types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']},
  ['blocking']
)

chrome.tabs.onUpdated.addListener(
  function (tabid, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      if (!tab.url.includes(wikiIdentifier) && !tab.url.includes(grokiIdentifier) && !tab.url.includes(igIdentifier)) {
        redirectedArray[tabid] = 'allowRedirect'
      }
    }
  }
)