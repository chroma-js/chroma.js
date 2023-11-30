import assert from 'assert';

import rgb2and from '../src/io/and/rgb2and.js';

describe('Testing rgb2and color conversions', () => {
    describe('convert to numeric Android colors', () => {
        const topic = {
            black: { in: [[0, 0, 0, 1]], out: -16777216 },
            white: { in: [[255, 255, 255, 1]], out: -1 },
            red: { in: [[255, 0, 0, 1]], out: -65536 },
            redAlpha: { in: [[255, 0, 0, 0.37]], out: 16711680 },
            redNoAlpha: { in: [[255, 0, 0, 0.37], 'rgb'], out: -65536 }
        };
        test('num', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(rgb2and(...topic[key].in), topic[key].out);
            });
        });
    });
});
