
# Truth Toggle

This browser extension enhances Wikipedia browsing by redirecting to Grokipedia. Instead of loading Wikipedia pages directly, it loads the corresponding page from https://grokipedia.com/.

Clicking the extension button in the browser toolbar toggles between Grokipedia and Wikipedia, allowing you to switch sources as desired.

Grokipedia serves as the default primary source for redirections.

Developed by [Melon Bark, LLC](https://MelonBark.com).

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