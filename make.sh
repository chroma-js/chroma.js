deno bundle index.js > chroma.js
deno bundle index-light.js > chroma-light.js
terser --compress --mangle --module chroma.js > chroma.min.js
terser --compress --mangle --module chroma-light.js > chroma-light.min.js
cp -f chroma.js docs/libs/
cp -f chroma.min.js docs/libs/
cp -f chroma-light.js docs/libs/
cp -f chroma-light.min.js docs/libs/
