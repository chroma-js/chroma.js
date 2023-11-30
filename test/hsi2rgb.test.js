import assert from 'assert';
import hsi2rgb from '../src/io/hsi/hsi2rgb.js';

const round = digits => {
    const d = Math.pow(10, digits);
    return v => Math.round(v * d) / d;
};

describe('Testing CMYK color conversions', () => {
    describe('parse simple HSI colors', () => {
        const topic = {
            black: { in: [0, 0, 0], out: [0, 0, 0, 1] },
            black2: { in: [NaN, 0, 0], out: [0, 0, 0, 1] },
            white: { in: [0, 0, 1], out: [255, 255, 255, 1] },
            gray: { in: [0, 0, 0.5], out: [127.5, 127.5, 127.5, 1] },
            red: { in: [0, 1, 1 / 3], out: [255, 0, 0, 1] },
            yellow: { in: [60, 1, 2 / 3], out: [255, 255, 0, 1] },
            green: { in: [120, 1, 1 / 3], out: [0, 255, 0, 1] },
            cyan: { in: [180, 1, 2 / 3], out: [0, 255, 255, 1] },
            blue: { in: [240, 1, 1 / 3], out: [0, 0, 255, 1] },
            magenta: { in: [300, 1, 2 / 3], out: [255, 0, 255, 1] },
            red_again: { in: [360, 1, 1 / 3], out: [255, 0, 0, 1] }
        };
        test('hsi_arr', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(hsi2rgb(topic[key].in).map(round(4)), topic[key].out);
            });
        });
        test('hsi_args', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(
                    hsi2rgb.apply(null, topic[key].in).map(round(4)),
                    topic[key].out,
                    key
                );
            });
        });
        test('hsi_obj', () => {
            Object.keys(topic).forEach(key => {
                const [h, s, i] = topic[key].in;
                assert.deepEqual(hsi2rgb({ h, s, i }).map(round(4)), topic[key].out, key);
            });
        });
    });
});
