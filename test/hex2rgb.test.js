import assert from 'assert';
import hex2rgb from '../src/io/hex/hex2rgb.js';

// const round = (digits) => {
//     const d = Math.pow(10,digits);
//     return (v) => Math.round(v*d) / d;
// }

describe('Testing HEX2RGB color conversions', () => {
    describe('parse simple #rrggbb HEX colors', () => {
        const topic = [
            '#000000',
            '#ffffff',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#00ffff',
            '#ff00ff'
        ];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 1]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 1]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 1]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 1]);
        });
        test(blue, () => {
            assert.deepEqual(hex2rgb(topic[4]), [0, 0, 255, 1]);
        });
        test(yellow, () => {
            assert.deepEqual(hex2rgb(topic[5]), [255, 255, 0, 1]);
        });
        test(cyan, () => {
            assert.deepEqual(hex2rgb(topic[6]), [0, 255, 255, 1]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[7]), [255, 0, 255, 1]);
        });
    });
    describe('parse simple rrggbb HEX colors without #', () => {
        const topic = [
            '000000',
            'ffffff',
            'ff0000',
            '00ff00',
            '0000ff',
            'ffff00',
            '00ffff',
            'ff00ff'
        ];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 1]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 1]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 1]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 1]);
        });
        test(blue, () => {
            assert.deepEqual(hex2rgb(topic[4]), [0, 0, 255, 1]);
        });
        test(yellow, () => {
            assert.deepEqual(hex2rgb(topic[5]), [255, 255, 0, 1]);
        });
        test(cyan, () => {
            assert.deepEqual(hex2rgb(topic[6]), [0, 255, 255, 1]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[7]), [255, 0, 255, 1]);
        });
    });
    describe('parse simple short-hand HEX colors', () => {
        const topic = ['#000', '#fff', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 1]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 1]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 1]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 1]);
        });
        test(blue, () => {
            assert.deepEqual(hex2rgb(topic[4]), [0, 0, 255, 1]);
        });
        test(yellow, () => {
            assert.deepEqual(hex2rgb(topic[5]), [255, 255, 0, 1]);
        });
        test(cyan, () => {
            assert.deepEqual(hex2rgb(topic[6]), [0, 255, 255, 1]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[7]), [255, 0, 255, 1]);
        });
    });
    describe('parse simple short-hand HEX colors without #', () => {
        const topic = ['000', 'fff', 'f00', '0f0', '00f', 'ff0', '0ff', 'f0f'];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 1]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 1]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 1]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 1]);
        });
        test(blue, () => {
            assert.deepEqual(hex2rgb(topic[4]), [0, 0, 255, 1]);
        });
        test(yellow, () => {
            assert.deepEqual(hex2rgb(topic[5]), [255, 255, 0, 1]);
        });
        test(cyan, () => {
            assert.deepEqual(hex2rgb(topic[6]), [0, 255, 255, 1]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[7]), [255, 0, 255, 1]);
        });
    });
    describe('parse different #rrggbbaa HEX colors', () => {
        const topic = ['#00000000', '#ffffff80', '#ff000040', '#00FF00C0', '#FF00FFFF'];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 0]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 0.5]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 0.25]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 0.75]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[4]), [255, 0, 255, 1]);
        });
    });
    describe('parse different rrggbbaa HEX colors without #', () => {
        const topic = ['00000000', 'ffffff80', 'ff000040', '00FF00C0', 'FF00FFFF'];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 0]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 0.5]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 0.25]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 0.75]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[4]), [255, 0, 255, 1]);
        });
    });
    describe('parse different #rgba HEX colors', () => {
        const topic = ['#0000', '#fff8', '#f004', '#0F0C', '#F0FF'];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 0]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 0.53]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 0.27]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 0.8]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[4]), [255, 0, 255, 1]);
        });
    });
    describe('parse different rgba HEX colors without #', () => {
        const topic = ['0000', 'fff8', 'f004', '0F0C', 'F0FF'];
        test(black, () => {
            assert.deepEqual(hex2rgb(topic[0]), [0, 0, 0, 0]);
        });
        test(white, () => {
            assert.deepEqual(hex2rgb(topic[1]), [255, 255, 255, 0.53]);
        });
        test(red, () => {
            assert.deepEqual(hex2rgb(topic[2]), [255, 0, 0, 0.27]);
        });
        test(green, () => {
            assert.deepEqual(hex2rgb(topic[3]), [0, 255, 0, 0.8]);
        });
        test(magenta, () => {
            assert.deepEqual(hex2rgb(topic[4]), [255, 0, 255, 1]);
        });
    });
});
