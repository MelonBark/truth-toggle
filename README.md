
# Truth Toggle

This browser extension enhances Wikipedia browsing by redirecting to alternative sources. Instead of loading Wikipedia pages directly, it first attempts to load the corresponding page from https://grokipedia.com/. If the Grokipedia page is not found, it falls back to Infogalactic.

Clicking the extension button in the browser toolbar toggles between the selected sources, allowing you to switch back to Wikipedia or cycle through alternatives as desired.

Grokipedia serves as the default primary source for redirections.

# Installation

The extension is available for Chrome, Firefox, and Microsoft Edge.

- **Chrome**: Install from the [Chrome Web Store](link-to-be-added)
- **Firefox**: Install from [Firefox Add-ons](link-to-be-added)
- **Edge**: Install from the [Microsoft Edge Add-ons](link-to-be-added)

## Behaviour

- Tab-limited: whatever you do with it in one tab won't affect another. If you press the button (thus disabling the auto-redirect behaviour), and have any other tabs open (or open a new tab), those other tabs will still behave in their default, auto-redirecting way

- Encyclopedia session-limited: your choice is forgotten when you leave. If you click the button (thus disabling the auto-redirect behaviour), and then navigate off to other sites, the auto-redirect behaviour will be reset.

## Development

The extension uses Manifest V3 for modern browser compatibility. Separate folders contain browser-specific manifests while sharing common code.

- `Chrome/`: Chrome-specific files
- `Firefox/`: Firefox-specific files
- `Edge/`: Microsoft Edge-specific files

## The Future

- Add a settings panel to allow end users to configure the primary source, fallback options, and other preferences.
