const fs = require('fs');

const baseManifest = {
  "manifest_version": 2,

  "name": "Github Fast Traveler",
  "short_name": "github-fast-traveler",
  "description": "This extension is provide contents search experience like IDE when you browse the Github.",
  "version": "3.0.2",
  "author": "t-kuni",

  "browser_action": {
    "default_icon": "resources/images/icon128.png",
    "default_popup": "dist/popup.html"
  },
  "content_scripts": [
	{
      "matches": ["https://github.com/*"],
      "js": ["dist/content_script.js"],
	  "run_at": "document_end"
	}
  ],
  "web_accessible_resources": [
    "dist/embedded_script.js"
  ],
  "permissions": [
      "storage"
  ],
  "icons": {
      "16": "resources/images/icon16.png",
      "48": "resources/images/icon48.png",
      "128": "resources/images/icon128.png"
  },
};

let env = 'production';
if (process.argv.length > 2 && process.argv[2] === 'dev') {
  env = 'development';
}

let manifest = baseManifest;
if (env === 'development') {
    manifest = Object.assign({}, baseManifest, {
        "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self';",
    })
}

const json = JSON.stringify(manifest, null , "\t");
fs.writeFileSync('manifest.json', json, {});