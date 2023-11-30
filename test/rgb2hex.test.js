import assert from 'assert';
import rgb2hex from '../src/io/hex/rgb2hex.js';

const tests = {
    black: { rgb: [0, 0, 0, 1], mode: 'auto', hex: '#000000' },
    white: { rgb: [255, 255, 255, 1], mode: 'auto', hex: '#ffffff' },
    gray: { rgb: [128, 128, 128, 1], mode: 'auto', hex: '#808080' },
    red: { rgb: [255, 0, 0, 1], mode: 'auto', hex: '#ff0000' },
    yellow: { rgb: [0, 255, 0, 1], mode: 'auto', hex: '#00ff00' },
    green: { rgb: [0, 0, 255, 1], mode: 'auto', hex: '#0000ff' },
    cyan: { rgb: [255, 255, 0, 1], mode: 'auto', hex: '#ffff00' },
    blue: { rgb: [0, 255, 255, 1], mode: 'auto', hex: '#00ffff' },
    magenta: { rgb: [255, 0, 255], mode: 'rgb', hex: '#ff00ff' },
    auto_rgba: { rgb: [255, 0, 255, 0.5], mode: 'auto', hex: '#ff00ff80' },
    force_rgba: { rgb: [255, 0, 255], mode: 'rgba', hex: '#ff00ffff' },
    force_rgb: { rgb: [255, 0, 255, 0.5], mode: 'rgb', hex: '#ff00ff' }
};

describe('Test rgb2hex color conversions', () => {
    Object.values(tests).forEach(([key, topic]) => {
        describe(`rgb2hex ${key}`, () => {
            test('array', () => {
                assert.deepStrictEqual(rgb2hex(topic.rgb, topic.mode || 'auto'), topic.hex);
            });
            test('obj', () => {
                let [r, g, b] = topic.rgb;
                let obj = { r, g, b, ...(topic.rgb.length > 3 ? { a: topic.rgb[3] } : {}) };
                assert.deepStrictEqual(rgb2hex(obj, topic.mode || 'auto'), topic.hex);
            });
            test('args', () => {
                if (topic.mode != 'auto') return;
                assert.deepStrictEqual(rgb2hex.apply(null, topic.rgb), topic.hex);
            });
        });
    });
});
