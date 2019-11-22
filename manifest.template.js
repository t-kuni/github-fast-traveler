const fs = require('fs');

const baseManifest = {
  "manifest_version": 2,

  "name": "github-fast-traveler",
  "short_name": "github-fast-traveler",
  "description": "github-fast-traveler",
  "version": "0.1",
  "author": "t-kuni",

  "browser_action": {
    "default_icon": "resources/images/icon.png",
    "default_popup": "dist/popup.html"
  },
  "content_scripts": [
	{
      "matches": ["https://github.com/*"],
      "js": ["dist/content_script.js"],
	  "run_at": "document_start"
	}
  ],
  "permissions": [
  ]
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
fs.writeFileSync('manifest.json', json);