// test all the snippets in docs/
import assert from 'assert';
import chroma from '../chroma.js';

globalThis.chroma = chroma;

const DOCS = await fetch(new URL('../docs/src/index.md', import.meta.url)).then(r => r.text());

const snippets = DOCS.match(/^```js$\r?\n(^[^`].+$\r?\n)+/gm).map(s => {
    return s.split('\n').slice(1).join('\n');
});

globalThis.data = [
    2.0, 3.5, 3.6, 3.8, 3.8, 4.1, 4.3, 4.4, 4.6, 4.9, 5.2, 5.3, 5.4, 5.7, 5.8, 5.9, 6.2, 6.5, 6.8,
    7.2, 8
];

describe('Tests all snippets in the documentation', () => {
    snippets.forEach((code, i) => {
        if (code.indexOf('function') > -1) return;
        if (code.indexOf('### ') > -1) return;
        describe(`run code snippet ${i}`, () => {
            function topic() {
                eval(code);
            }
            test('no errors thrown', () => {
                assert.doesNotThrow(topic, Error, code);
            });
        });
    });
});
