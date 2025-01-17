import assert from 'assert';
import limit from '../src/utils/limit.js';
import oklab2rgb from '../src/io/oklab/oklab2rgb.js';

const round = v => limit(Math.round(v), 0, 255);

describe('Testing CMYK color conversions', () => {
    describe('oklab2rgb', () => {
        const topic = {
            black: { in: [0.0, 0.0, 0.0], out: [0, 0, 0, 1] },
            white: { in: [1.0, 0.0, 0.0], out: [255, 255, 255, 1] },
            gray: { in: [0.59987, 0.0, 0.0], out: [128, 128, 128, 1] },
            red: { in: [0.62796, 0.22486, 0.12585], out: [255, 0, 0, 1] },
            yellow: { in: [0.96798, -0.07137, 0.19857], out: [255, 255, 0, 1] },
            green: { in: [0.51975, -0.1403, 0.10768], out: [0, 128, 0, 1] },
            cyan: { in: [0.9054, -0.14944, -0.0394], out: [0, 255, 255, 1] },
            blue: { in: [0.45201, -0.03246, -0.31153], out: [0, 0, 255, 1] },
            magenta: { in: [0.70167, 0.27457, -0.16916], out: [255, 0, 255, 1] }
        };
        test('lab_arr', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(oklab2rgb(topic[key].in).map(round), topic[key].out);
            });
        });
        test('lab_args', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(
                    oklab2rgb.apply(null, topic[key].in).map(round),
                    topic[key].out,
                    key
                );
            });
        });
        test('lab_obj', () => {
            Object.keys(topic).forEach(key => {
                const [l, a, b] = topic[key].in;
                assert.deepEqual(oklab2rgb({ l, a, b }).map(round), topic[key].out, key);
            });
        });
    });
});
