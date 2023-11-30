import assert from 'assert';
import lab2lch from '../src/io/lch/lab2lch.js';

const tests = {
    black: { lab: [0, 0, 0], lch: [0, 0, NaN] },
    white: { lab: [100, 0, 0], lch: [100, 0, NaN] },
    gray: { lab: [53.59, 0, 0], lch: [53.59, 0, NaN] },
    red: { lab: [53.24, 80.09, 67.2], lch: [53.24, 104.55, 40] },
    yellow: { lab: [97.14, -21.55, 94.48], lch: [97.14, 96.91, 102.85] },
    green: { lab: [87.73, -86.18, 83.18], lch: [87.73, 119.77, 136.01] },
    cyan: { lab: [91.11, -48.09, -14.13], lch: [91.11, 50.12, 196.37] },
    blue: { lab: [32.3, 79.19, -107.86], lch: [32.3, 133.81, 306.29] },
    magenta: { lab: [60.32, 98.23, -60.82], lch: [60.32, 115.53, 328.24] }
};

const round = digits => {
    const d = Math.pow(10, digits);
    return v => Math.round(v * d) / d;
};

const rnd = round(2);

describe('Testlabg lab2lch color conversions', () => {
    for (const [key, topic] of Object.values(tests)) {
        describe(`lab2lch ${key}`, () => {
            test('array', () => {
                assert.deepStrictEqual(lab2lch(topic.lab).map(rnd), topic.lch);
            });
            test('args', () => {
                assert.deepStrictEqual(lab2lch.apply(null, topic.lab).map(rnd), topic.lch);
            });
            test('obj', () => {
                let [l, a, b] = topic.lab;
                assert.deepStrictEqual(lab2lch({ l, a, b }).map(rnd), topic.lch);
            });
        });
    }
});
