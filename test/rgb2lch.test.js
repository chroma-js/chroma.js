import assert from 'assert';
import rgb2lch from '../src/io/lch/rgb2lch.js';

const tests = {
    black: { lch: [0, 0, NaN], rgb: [0, 0, 0] },
    white: { lch: [100, 0, NaN], rgb: [255, 255, 255] },
    gray: { lch: [53.59, 0, NaN], rgb: [128, 128, 128] },
    red: { lch: [53.24, 104.55, 40], rgb: [255, 0, 0] },
    yellow: { lch: [97.14, 96.91, 102.85], rgb: [255, 255, 0] },
    green: { lch: [87.73, 119.78, 136.02], rgb: [0, 255, 0] },
    cyan: { lch: [91.11, 50.12, 196.38], rgb: [0, 255, 255] },
    blue: { lch: [32.3, 133.81, 306.28], rgb: [0, 0, 255] },
    magenta: { lch: [60.32, 115.54, 328.23], rgb: [255, 0, 255] }
};

const round = digits => {
    const d = Math.pow(10, digits);
    return v => {
        if (v > -1e-3 && v < 1e-3) v = 0;
        return Math.round(v * d) / d;
    };
};
const rnd = round(2);

describe('Test rgb2lch color conversions', () => {
    Object.values(tests).forEach(([key, topic]) => {
        describe(`rgb2lch ${key}`, () => {
            test('array', () => {
                assert.deepStrictEqual(rgb2lch(topic.rgb).map(rnd), topic.lch);
            });
            test('obj', () => {
                let [r, g, b] = topic.rgb;
                assert.deepStrictEqual(rgb2lch({ r, g, b }).map(rnd), topic.lch);
            });
            test('args', () => {
                assert.deepStrictEqual(rgb2lch.apply(null, topic.rgb).map(rnd), topic.lch);
            });
        });
    });
});
