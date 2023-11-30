import assert from 'assert';
import chroma from '../index.js';

const round = function (digits) {
    var d;
    d = Math.pow(10, digits);
    return function (v) {
        return Math.round(v * d) / d;
    };
};

describe('Some tests for chroma.color()', () => {
    describe('hsv black', () => {
        const topic = chroma('black').hsv();
        test('hue is NaN', () => {
            assert(isNaN(topic[0]));
        });
        test('but hue is defined', () => {
            assert(topic[0] != null);
        });
    });
    describe('toString', () => {
        const topic = chroma('greenyellow');
        test('explicit', () => {
            assert.equal(topic.toString(), '#adff2f');
        });
        test('implicit', () => {
            assert.equal('' + topic, '#adff2f');
        });
        test('implicit2', () => {
            assert.equal(String(topic), '#adff2f');
        });
    });
    describe('constructing numeric color', () => {
        const topic = chroma.num(0xadff2f);
        test('color is red', () => {
            assert.equal(topic.name(), 'greenyellow');
        });
        test('alpha is 100%', () => {
            assert.equal(topic.alpha(), 1);
        });
    });
    describe('normalize hue', () => {
        const topic = chroma.rgb(0, 255, 255).lch();
        test('hue > 0', () => {
            assert(topic[2] >= 0);
        });
        test('hue < 360', () => {
            assert(topic[2] <= 360);
        });
    });
    describe('lab conversion red', () => {
        const topic = chroma('red').lab().map(round(3));
        test('is right', () => {
            assert.deepEqual(topic, [53.241, 80.092, 67.203]);
        });
    });
    describe('lab conversion blue', () => {
        const topic = chroma('blue').lab().map(round(3));
        test('is right', () => {
            assert.deepEqual(topic, [32.297, 79.188, -107.86]);
        });
    });
    describe('lab conversion green', () => {
        const topic = chroma('green').lab().map(round(3));
        test('is right', () => {
            assert.deepEqual(topic, [46.227, -51.698, 49.897]);
        });
    });
    describe('lab conversion yellow', () => {
        const topic = chroma('yellow').lab().map(round(3));
        test('is right', () => {
            assert.deepEqual(topic, [97.139, -21.554, 94.478]);
        });
    });
    describe('lab conversion magenta', () => {
        const topic = chroma('magenta').lab().map(round(3));
        test('is right', () => {
            assert.deepEqual(topic, [60.324, 98.234, -60.825]);
        });
    });
    describe('hueless css hsl colors', () => {
        const topic = [chroma('black'), chroma('gray'), chroma('white')];
        test('black', () => {
            assert.equal(topic[0].css('hsl'), 'hsl(0,0%,0%)');
        });
        test('gray', () => {
            assert.equal(topic[1].css('hsl'), 'hsl(0,0%,50.2%)');
        });
        test('white', () => {
            assert.equal(topic[2].css('hsl'), 'hsl(0,0%,100%)');
        });
    });
    describe('hcl.h is NaN for hue-less colors', () => {
        const topic = [chroma('black'), chroma('gray'), chroma('white')];
        test('black', () => {
            assert.isNaN(topic[0].hcl()[0]);
        });
        test('gray', () => {
            assert.isNaN(topic[1].hcl()[0]);
        });
        test('white', () => {
            assert.isNaN(topic[2].hcl()[0]);
        });
    });
    describe('lab-rgb precision', () => {
        const topic = [74, 24, 78];
        test('to_rgb_to_lab', () => {
            assert.deepEqual(chroma.rgb(chroma.lab(topic).rgb(false)).lab().map(round(3)), topic);
        });
    });
    describe('cmyk-rgb precision', () => {
        const topic = [0, 1, 1, 0.02];
        test('to_rgb_to_cmyk', () => {
            assert.deepEqual(chroma.rgb(chroma.cmyk(topic).rgb(false)).cmyk().map(round(3)), topic);
        });
    });
    describe('auto-detect rgba in hex output', () => {
        const topic = ['rgba(255,0,0,1)', 'rgba(255,0,0,0.5)'];
        test('rgb if alpha == 1', () => {
            assert.equal(chroma(topic[0]).hex(), '#ff0000');
        });
        test('rgba if alpha != 1', () => {
            assert.equal(chroma(topic[1]).hex(), '#ff000080');
        });
    });
})['export'](module);
