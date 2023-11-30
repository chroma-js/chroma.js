import assert from 'assert';
import rgb2hsv from '../src/io/hsv/rgb2hsv.js';

const tests = {
    black: { hsv: [NaN, 0, 0], rgb: [0, 0, 0, 1] },
    white: { hsv: [NaN, 0, 1], rgb: [255, 255, 255, 1] },
    gray: { hsv: [NaN, 0, 0.5], rgb: [127.5, 127.5, 127.5, 1] },
    red: { hsv: [0, 1, 1], rgb: [255, 0, 0, 1] },
    yellow: { hsv: [60, 1, 1], rgb: [255, 255, 0, 1] },
    green: { hsv: [120, 1, 1], rgb: [0, 255, 0, 1] },
    cyan: { hsv: [180, 1, 1], rgb: [0, 255, 255, 1] },
    blue: { hsv: [240, 1, 1], rgb: [0, 0, 255, 1] },
    magenta: { hsv: [300, 1, 1], rgb: [255, 0, 255, 1] }
};

describe('Test rgb2hsv color conversions', () => {
    Object.values(tests).forEach(([key, topic]) => {
        describe(`rgb2hsv ${key}`, () => {
            test('array', () => {
                assert.deepStrictEqual(rgb2hsv(topic.rgb), topic.hsv);
            });
            test('obj', () => {
                let [r, g, b] = topic.rgb;
                assert.deepStrictEqual(rgb2hsv({ r, g, b }), topic.hsv);
            });
            test('args', () => {
                assert.deepStrictEqual(rgb2hsv.apply(null, topic.rgb), topic.hsv);
            });
        });
    });
});
