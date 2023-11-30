import assert from 'assert';
import rgb2oklch from '../src/io/oklch/rgb2oklch.js';

const tests = {
    black: { oklch: [0.0, 0.0, NaN], rgb: [0, 0, 0, 1] },
    white: { oklch: [1.0, 0.0, NaN], rgb: [255, 255, 255, 1] },
    gray: { oklch: [0.6, 0.0, NaN], rgb: [128, 128, 128, 1] },
    red: { oklch: [0.628, 0.258, 29.234], rgb: [255, 0, 0, 1] },
    yellow: { oklch: [0.968, 0.211, 109.769], rgb: [255, 255, 0, 1] },
    green: { oklch: [0.52, 0.177, 142.495], rgb: [0, 128, 0, 1] },
    cyan: { oklch: [0.905, 0.155, 194.769], rgb: [0, 255, 255, 1] },
    blue: { oklch: [0.452, 0.313, 264.052], rgb: [0, 0, 255, 1] },
    magenta: { oklch: [0.702, 0.322, 328.363], rgb: [255, 0, 255, 1] }
};

const round = digits => {
    const d = Math.pow(10, digits);
    return v => {
        if (v > -1e-3 && v < 1e-3) v = 0;
        return Math.round(v * d) / d;
    };
};

const rnd = round(3);

describe('Test rgb2oklch color conversions', () => {
    Object.values(tests).forEach(([key, topic]) => {
        describe(`rgb2oklch ${key}`, () => {
            test('array', () => {
                assert.deepStrictEqual(rgb2oklch(topic.rgb).map(rnd), topic.oklch);
            });
            test('obj', () => {
                let [r, g, b] = topic.rgb;
                assert.deepStrictEqual(rgb2oklch({ r, g, b }).map(rnd), topic.oklch);
            });
            test('args', () => {
                assert.deepStrictEqual(rgb2oklch.apply(null, topic.rgb).map(rnd), topic.oklch);
            });
        });
    });
});
