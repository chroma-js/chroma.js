import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for chroma.color()', () => {
    describe('named colors', () => {
        const topic = chroma('red');
        test('hex', () => {
            assert.equal(topic.hex(), '#ff0000');
        });
        test('rgb', () => {
            assert.deepEqual(topic.rgb(), [255, 0, 0]);
        });
    });
    describe('hex colors', () => {
        const topic = chroma('#f00');
        test('name', () => {
            assert.equal(topic.name(), 'red');
        });
        test('hex', () => {
            assert.equal(topic.hex(), '#ff0000');
        });
        test('hex rgba', () => {
            assert.equal(topic.hex('rgba'), '#ff0000ff');
        });
        test('hex argb', () => {
            assert.equal(topic.hex('argb'), '#ffff0000');
        });
        test('rgb', () => {
            assert.deepEqual(topic.rgb(), [255, 0, 0]);
        });
    });
    describe('hex color, no #', () => {
        const topic = chroma('F00');
        test('name', () => {
            assert.equal(topic.name(), 'red');
        });
        test('hex', () => {
            assert.equal(topic.hex(), '#ff0000');
        });
        test('rgb', () => {
            assert.deepEqual(topic.rgb(), [255, 0, 0]);
        });
    });
    describe('css color rgb', () => {
        const topic = chroma('rgb(255,0,0)');
        test('hex', () => {
            assert.equal(topic.hex(), '#ff0000');
        });
    });
    describe('rgba css color', () => {
        const topic = chroma('rgba(128,0,128,0.5)');
        test('hex', () => {
            assert.equal(topic.hex(), '#80008080');
        });
        test('hex rgb', () => {
            assert.equal(topic.hex('rgb'), '#800080');
        });
        test('alpha', () => {
            assert.equal(topic.alpha(), 0.5);
        });
        test('css', () => {
            assert.equal(topic.css(), 'rgba(128,0,128,0.5)');
        });
    });
    describe('hsla css color', () => {
        const topic = chroma('hsla(240,100%,50%,0.5)');
        test('hex', () => {
            assert.equal(topic.hex(), '#0000ff80');
        });
        test('hex rgb', () => {
            assert.equal(topic.hex('rgb'), '#0000ff');
        });
        test('alpha', () => {
            assert.equal(topic.alpha(), 0.5);
        });
        test('css', () => {
            assert.equal(topic.css(), 'rgba(0,0,255,0.5)');
        });
    });
    describe('hsla color', () => {
        const topic = chroma('lightsalmon');
        test('css (default)', () => {
            assert.equal(topic.css(), 'rgb(255,160,122)');
        });
        test('css (rgb)', () => {
            assert.equal(topic.css('rgb'), 'rgb(255,160,122)');
        });
        test('css (hsl)', () => {
            assert.equal(chroma(topic.css('hsl')).name(), 'lightsalmon');
        });
        test('css (rgb-css)', () => {
            assert.equal(chroma(topic.css('rgb')).name(), 'lightsalmon');
        });
    });
    describe('rgb color', () => {
        const topic = chroma(255, 0, 0);
        test('hex', () => {
            assert.equal(topic.hex(), '#ff0000');
        });
    });
    describe('hsv black', () => {
        const topic = chroma('black').hsv();
        test('hue is NaN', () => {
            assert(isNaN(topic[0]));
        });
        test('but hue is defined', () => {
            assert(topic[0] != null);
        });
    });
    describe('hsl black', () => {
        const topic = chroma('black').hsl();
        test('hue is NaN', () => {
            assert(isNaN(topic[0]));
        });
        test('but hue is defined', () => {
            assert(topic[0] != null);
        });
        test('sat is 0', () => {
            assert.equal(topic[1], 0);
        });
        test('lightness is 0', () => {
            assert.equal(topic[2], 0);
        });
    });
    describe('constructing with array, but no mode', () => {
        const topic = chroma([255, 0, 0]);
        test('falls back to rgb', () => {
            assert.equal(topic.hex(), chroma([255, 0, 0], 'rgb').hex());
        });
    });
    describe('num color', () => {
        const topic = [
            chroma(0xff0000),
            chroma(0x000000),
            chroma(0xffffff),
            chroma(0x31ff98),
            chroma('red')
        ];
        test('hex', () => {
            assert.equal(topic[0].hex(), '#ff0000');
        });
        test('num', () => {
            assert.equal(topic[0].num(), 0xff0000);
        });
        test('hex-black', () => {
            assert.equal(topic[1].hex(), '#000000');
        });
        test('num-black', () => {
            assert.equal(topic[1].num(), 0x000000);
        });
        test('hex-white', () => {
            assert.equal(topic[2].hex(), '#ffffff');
        });
        test('num-white', () => {
            assert.equal(topic[2].num(), 0xffffff);
        });
        test('hex-rand', () => {
            assert.equal(topic[3].hex(), '#31ff98');
        });
        test('num-rand', () => {
            assert.equal(topic[3].num(), 0x31ff98);
        });
        test('rum-red', () => {
            assert.equal(topic[4].num(), 0xff0000);
        });
    });
});
