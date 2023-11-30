import assert from 'assert';
import rgb2hsi from '../src/io/hsi/rgb2hsi.js';

const tests = {
    black2: { hsi: [NaN, 0, 0], rgb: [0, 0, 0, 1] },
    white: { hsi: [NaN, 0, 1], rgb: [255, 255, 255, 1] },
    gray: { hsi: [NaN, 0, 0.5], rgb: [127.5, 127.5, 127.5, 1] },
    red: { hsi: [0, 1, 1 / 3], rgb: [255, 0, 0, 1] },
    yellow: { hsi: [60, 1, 2 / 3], rgb: [255, 255, 0, 1] },
    green: { hsi: [120, 1, 1 / 3], rgb: [0, 255, 0, 1] },
    cyan: { hsi: [180, 1, 2 / 3], rgb: [0, 255, 255, 1] },
    blue: { hsi: [240, 1, 1 / 3], rgb: [0, 0, 255, 1] },
    magenta: { hsi: [300, 1, 2 / 3], rgb: [255, 0, 255, 1] }
};

const round = digits => {
    const d = Math.pow(10, digits);
    return v => Math.round(v * d) / d;
};
const rnd = round(5);

const batch = {};

Object.values(tests).forEach(([key, topic]) => {
    describe(`rgb2hsi ${key}`, () => {
        test('array', () => {
            assert.deepStrictEqual(rgb2hsi(topic.rgb).map(rnd), topic.hsi.map(rnd));
        });
        test('obj', () => {
            let [r, g, b] = topic.rgb;
            assert.deepStrictEqual(rgb2hsi({ r, g, b }).map(rnd), topic.hsi.map(rnd));
        });
        test('args', () => {
            if (topic.mode != 'auto') return;
            assert.deepStrictEqual(rgb2hsi.apply(null, topic.rgb).map(rnd), topic.hsi.map(rnd));
        });
    });
});

describe('Test rgb2hsi color conversions').addBatch(batch);
