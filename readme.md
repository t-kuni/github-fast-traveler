# About

Github Fast Traveler is chrome extension, providing contents search experience like IDE when you browse the Github.

# Features

* Provide shortcut keys to popup some useful Dialog for moving between repositories or code on github.
* Customize shortcut keys.

# Installation on Chrome 

[Install from Webstore](https://chrome.google.com/webstore/detail/github-fast-traveler/pmdkekjlfomldobcjoochbdfpdfhkdna)

# Development Build


```
npm install
npm run manifest
npm run watch
```

# Enable extension for development

1.Build this extension.

2.Open chrome extension tab.

```
chrome://extensions
```

3.Load this folder from `load unpacked` button.

4.Make sure to be shown button of this extension in extension bar of top right of window.


# Release Build

```
npm run release
```