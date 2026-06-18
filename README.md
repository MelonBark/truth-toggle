
# Truth Toggle

This browser extension enhances Wikipedia browsing by redirecting to Grokipedia. Instead of loading Wikipedia pages directly, it loads the corresponding page from https://grokipedia.com/.

Clicking the extension button in the browser toolbar toggles between Grokipedia and Wikipedia, allowing you to switch sources as desired.

Grokipedia serves as the default primary source for redirections.

Developed by [Melon Bark, LLC](https://MelonBark.com).

## Store listing — single purpose

Per [Microsoft Edge extension policy 1.1.1](https://learn.microsoft.com/en-us/legal/microsoft-edge/extensions/developer-policies#111-extensions-must-have-a-single-purpose), Truth Toggle has one narrow purpose:

> **Truth Toggle automatically redirects Wikipedia article pages to the matching Grokipedia page. Clicking the toolbar button turns off auto-redirect for the current tab and lets you switch between Wikipedia and Grokipedia. The extension only accesses Wikipedia and Grokipedia URLs to perform these redirects; it does not collect, store, or transmit user data.**

## Store listing — permission justifications

Truth Toggle requests only the permissions required for its single purpose. No content scripts, network requests, storage APIs, or broad host access are used.

### `tabs`

**Justification:** The `tabs` permission is required to redirect encyclopedia pages and to keep redirect behavior scoped per tab.

- **`chrome.tabs.onUpdated`** — Detects when the user navigates to a Wikipedia article so the extension can automatically redirect that tab to the matching Grokipedia URL.
- **`chrome.tabs.update`** — Navigates the current tab between Wikipedia and Grokipedia for both automatic redirects and toolbar-button toggles.
- **`chrome.action.onClicked`** — Reads the active tab’s URL and ID when the user clicks the toolbar button to disable auto-redirect and switch sources.
- **`chrome.tabs.onRemoved`** — Removes per-tab redirect state when a tab is closed.

`activeTab` alone is insufficient because auto-redirect runs on navigation without a user gesture.

### Host permissions

#### `*://*.wikipedia.org/*`

**Justification:** Truth Toggle must recognize Wikipedia article URLs in tab navigation events and redirect them to the equivalent Grokipedia page. This host permission limits the extension to the Wikipedia domain it supports and is used only to match and rewrite those article URLs; the extension does not inject scripts into or fetch content from Wikipedia.

#### `*://*.grokipedia.com/*`

**Justification:** Truth Toggle must recognize Grokipedia article URLs so the toolbar button can switch the current tab back to Wikipedia, and so the extension can navigate tabs to the matching Grokipedia page. This host permission limits the extension to the Grokipedia domain it uses for redirects; the extension does not inject scripts into or fetch content from Grokipedia.

# Installation

The extension is available for Chrome, Firefox, and Microsoft Edge.

- **Chrome**: Install from the [Chrome Web Store](https://chrome.google.com/webstore/devconsole/901a5c38-94d1-470f-8fe6-f30a8c20616c)
- **Firefox**: Install from [Firefox Add-ons](link-to-be-added)
- **Edge**: Install from the [Microsoft Edge Add-ons](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview)

## Behaviour

- Tab-limited: whatever you do with it in one tab won't affect another. If you press the button (thus disabling the auto-redirect behaviour), and have any other tabs open (or open a new tab), those other tabs will still behave in their default, auto-redirecting way

- Encyclopedia session-limited: your choice is forgotten when you leave. If you click the button (thus disabling the auto-redirect behaviour), and then navigate off to other sites, the auto-redirect behaviour will be reset.

## Development

The extension uses Manifest V3 for modern browser compatibility across Chrome, Firefox, and Microsoft Edge. All browser-specific code is consolidated in the `extension/` folder.

- `extension/`: Shared extension files including manifest.json, service_worker.js, and images

## The Future

- Add a settings panel to allow end users to configure the primary source, fallback options, and other preferences.