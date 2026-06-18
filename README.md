
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

## Store listing — notes for certification

Paste into **Submission Options → Notes for certification** in Partner Center ([guidance](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension#step-8-enter-certification-testing-notes-and-submit-the-extension)):

> **Test accounts:** None required. Truth Toggle does not use sign-in, subscriptions, or backend services.
>
> **How to test — auto-redirect (default behavior):**
> 1. Install the extension and open a new tab.
> 2. Navigate to a Wikipedia article, for example: `https://en.wikipedia.org/wiki/Ohio`
> 3. Expected: the tab automatically redirects to the matching Grokipedia URL (`https://grokipedia.com/page/Ohio`).
>
> **How to test — toolbar toggle:**
> 1. On a Wikipedia article tab, click the Truth Toggle toolbar icon once.
> 2. Expected: the tab navigates to the matching Grokipedia page and auto-redirect is disabled for that tab only.
> 3. Click the toolbar icon again while on Grokipedia.
> 4. Expected: the tab navigates back to the matching Wikipedia article (`https://wikipedia.org/wiki/...`).
>
> **Per-tab behavior:** Disabling auto-redirect via the toolbar button affects only the active tab. Other tabs continue to auto-redirect Wikipedia to Grokipedia until the button is used in those tabs.
>
> **Session reset:** If the user navigates away from Wikipedia/Grokipedia to another site and later returns to a Wikipedia article in the same tab, auto-redirect is re-enabled for that tab.
>
> **Version 1.7 changes:** Infogalactic support was removed. The extension now toggles only between Wikipedia and Grokipedia.
>
> **Technical notes for reviewers:**
> - Manifest V3 service worker only; no content scripts, no remote code, no network requests, no storage APIs.
> - Permissions: `tabs` plus host access to `wikipedia.org` and `grokipedia.com` only.
> - The extension rewrites tab URLs; it does not read or modify page content.
> - No user data is collected, stored, or transmitted.
>
> **Dependencies:** Requires live access to `wikipedia.org` and `grokipedia.com` during testing.

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