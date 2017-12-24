// Angular requires Zone.js
require('zone.js/dist/zone-node');

const express = require('express');
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;

const fs = require('fs');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

// Find the main.hash.bundle in the dist-server folder
let files;
try {
  files = fs.readdirSync(`${process.cwd()}/dist-server`);
} catch (error) {
  console.error(error);
}
let mainFiles = files.filter(file => file.startsWith('main'));
let split = mainFiles[0].split('.');
let hash = '';
if (split.length > 3) hash = split[1] + '.';
const {
  ServerAppModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist-server/main.${hash}bundle`);

const provider = provideModuleMap(LAZY_MODULE_MAP);

const app = express();

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: ServerAppModuleNgFactory,
    providers: [provider]
  })
);

app.set('view engine', 'html');
app.set('views', __dirname);

app.use(express.static(__dirname + '/assets', { index: false }));
app.use(express.static(__dirname + '/dist', { index: false }));

app.get('/*', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.render('./src/index', {
    req: req,
    res: res
  });
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(process.env.PORT || 8080, () => {});

