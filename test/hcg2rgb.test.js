import assert from 'assert';
import hcg2rgb from '../src/io/hcg/hcg2rgb.js';

describe('Testing HCG color conversions', () => {
    describe('parse simple HCG colors', () => {
        const topic = {
            black: { in: [0, 0, 0], out: [0, 0, 0, 1] },
            white: { in: [0, 0, 1], out: [255, 255, 255, 1] },
            gray: { in: [0, 0, 0.5], out: [127.5, 127.5, 127.5, 1] },
            red: { in: [0, 1, 0], out: [255, 0, 0, 1] },
            yellow: { in: [60, 1, 0], out: [255, 255, 0, 1] },
            green: { in: [120, 1, 0], out: [0, 255, 0, 1] },
            cyan: { in: [180, 1, 0], out: [0, 255, 255, 1] },
            blue: { in: [240, 1, 0], out: [0, 0, 255, 1] },
            magenta: { in: [300, 1, 0], out: [255, 0, 255, 1] },
            red_again: { in: [360, 1, 0], out: [255, 0, 0, 1] }
        };
        test('hcg_arr', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(hcg2rgb(topic[key].in), topic[key].out);
            });
        });
        test('hcg_args', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(hcg2rgb.apply(null, topic[key].in), topic[key].out, key);
            });
        });
        test('hcg_obj', () => {
            Object.keys(topic).forEach(key => {
                const [h, c, g] = topic[key].in;
                assert.deepEqual(hcg2rgb({ h, c, g }), topic[key].out, key);
            });
        });
    });
});
