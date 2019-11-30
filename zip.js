const AdmZip = require('adm-zip');
const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
const name = manifest.name;
const version = manifest.version;

const zip = new AdmZip();

zip.addLocalFolder("dist", "dist");
zip.addLocalFolder("resources", "resources");
zip.addLocalFile("manifest.json");
const willSendthis = zip.toBuffer();
zip.writeZip(`releases/${name}-${version}.zip`);

