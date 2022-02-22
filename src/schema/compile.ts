import { compile, compileFromFile } from 'json-schema-to-typescript';
import fs from 'fs';
import path from 'path';

(async () => {
  const blob = fs.readFileSync(path.join(__dirname, 'api.json'));
  const spec = JSON.parse(blob.toString());

  console.log(spec.definitions['config.ConfigInfo']);
})();