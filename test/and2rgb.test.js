import assert from 'assert';
import and2rgb from '../src/io/and/and2rgb.js';

describe('Testing and2rgb color conversions', () => {
    describe('parse simple numeric Android colors', () => {
        const topic = {
            black: { in: -16777216, out: [0, 0, 0, 1] },
            white: { in: -1, out: [255, 255, 255, 1] },
            red: { in: -65536, out: [255, 0, 0, 1] }
        };
        test('num', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(and2rgb(topic[key].in), topic[key].out);
            });
        });
    });
});
