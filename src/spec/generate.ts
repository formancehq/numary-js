import { compile } from 'json-schema-to-typescript';
import { parse } from 'yaml';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

(async () => {
  const file = path.join(__dirname, 'oas-1.8.2.yml');

  const raw = readFileSync(file, 'utf8')
    .toString()
    .replace(/\#\/components\/schemas/g, 'http://localhost/schemas');
  
  const oas : {
    components: {
      schemas: {
        [k: string]: object,
      },
    },
  } = parse(raw);

  const resolver = {
    order: 1,
    canRead: true,
  }

  for (const [name, schema] of Object.entries(oas.components.schemas)) {
    console.log(name, schema);

    const ts = await compile(schema, name, {
      bannerComment: '',
      $refOptions: {
        resolve: {
          http: {
            ...resolver,
            read: async (file) => {
              const name = file.url.split('/schemas/')[1];
              return oas.components.schemas[name];
            },
          },
        },
      },
    });

    writeFileSync(path.join(__dirname, `/types/${name}.d.ts`), ts);
  }
})();