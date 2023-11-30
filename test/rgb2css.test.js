import assert from 'assert';
import rgb2css from '../src/io/css/rgb2css.js';

const tests = {
    black: { rgb: [0, 0, 0], css: 'rgb(0,0,0)' },
    red: { rgb: [255, 0, 0], css: 'rgb(255,0,0)' },
    auto_rgba: { rgb: [255, 0, 0, 0.25], css: 'rgba(255,0,0,0.25)' },
    force_rgba: { rgb: [255, 0, 0], mode: 'rgba', css: 'rgba(255,0,0,1)' },
    hsl: { rgb: [255, 0, 0], mode: 'hsl', css: 'hsl(0,100%,50%)' },
    auto_hsla: { rgb: [255, 0, 0, 0.5], mode: 'hsl', css: 'hsla(0,100%,50%,0.5)' },
    force_hsla: { rgb: [255, 255, 0, 0.75], mode: 'hsl', css: 'hsla(60,100%,50%,0.75)' }
};

describe('Testing rgb2css color conversions', () => {
    Object.values(tests).forEach(([key, topic]) => {
        describe(key, () => {
            test('array', () => {
                assert.equal(rgb2css(topic.rgb, topic.mode || 'rgb'), topic.css);
            });
            test('obj', () => {
                let [r, g, b] = topic.rgb;
                let obj = { r, g, b, ...(topic.rgb.length > 3 ? { a: topic.rgb[3] } : {}) };
                assert.equal(rgb2css(obj, topic.mode), topic.css);
            });
            test('args', () => {
                if (topic.mode != 'rgb') return;
                assert.deepStrictEqual(rgb2css.apply(null, topic.rgb), topic.hex);
            });
        });
    });
});
