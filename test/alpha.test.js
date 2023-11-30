import assert from 'assert';
import chroma from '../index.js';

describe('Tests for the alpha channel', () => {
    describe('setting & getting alpha channel', () => {
        const topic = chroma('red');
        test('no arguments gets alpha', function () {
            assert.equal(topic.alpha(), 1);
        });
        test('setting alpha to 0.5', function () {
            assert.equal(topic.alpha(0.5).alpha(), 0.5);
        });
        test('alpha is unchanged', function () {
            assert.equal(topic.alpha(), 1);
        });
    });
    describe('interpolating alpha channel', () => {
        const topic = chroma.mix(chroma('white').alpha(0), chroma('black').alpha(1), 0.3, 'rgb');
        test('hex is #b3b3b3', function () {
            return assert.equal(topic.hex('rgb'), '#b3b3b3');
        });
        test('hex with alpha', function () {
            return assert.equal(topic.hex(), '#b3b3b34d');
        });
        test('alpha is 30%', function () {
            return assert.equal(topic.alpha(), 0.3);
        });
    });
    describe('constructing rgba color', () => {
        const topic = new chroma.Color(255, 0, 0, 0.5, 'rgb');
        test('alpha is 50%', function () {
            return assert.equal(topic.alpha(), 0.5);
        });
    });
    describe('constructing rgba color, rgb shorthand', () => {
        const topic = chroma.rgb(255, 0, 0, 0.5);
        test('alpha is 50%', function () {
            return assert.equal(topic.alpha(), 0.5);
        });
    });
    describe('constructing rgba color, hsl shorthand', () => {
        const topic = chroma.hsl(0, 1, 0.5).alpha(0.5);
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 50%', () => {
            assert.equal(topic.alpha(), 0.5);
        });
    });
    describe('parsing hex rgba colors', () => {
        const topic = chroma('#ff00004d');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 30%', () => {
            assert.equal(topic.alpha(), 0.3);
        });
        test('rgba output', () => {
            assert.deepEqual(topic.rgba(), [255, 0, 0, 0.3]);
        });
    });
    describe('parsing rgba colors', () => {
        const topic = chroma.css('rgba(255,0,0,.3)');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 30%', () => {
            assert.equal(topic.alpha(), 0.3);
        });
        test('rgba output', () => {
            assert.deepEqual(topic.rgba(), [255, 0, 0, 0.3]);
        });
    });
    describe('parsing rgba colors (percentage)', () => {
        const topic = chroma.css('rgba(100%,0%,0%,0.2)');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 20%', () => {
            assert.equal(topic.alpha(), 0.2);
        });
        test('rgb output', () => {
            assert.deepEqual(topic.rgb(), [255, 0, 0]);
        });
        test('rgba output', () => {
            assert.deepEqual(topic.rgba(), [255, 0, 0, 0.2]);
        });
    });
    describe('parsing hsla colors', () => {
        const topic = chroma.css('hsla(0,100%,50%,0.25)');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
        test('rgb output', () => {
            assert.deepEqual(topic.rgb(), [255, 0, 0]);
        });
        test('rgba output', () => {
            assert.deepEqual(topic.rgba(), [255, 0, 0, 0.25]);
        });
    });
    describe('constructing hsla color', () => {
        const topic = chroma(0, 1, 0.5, 0.25, 'hsl');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
    });
    describe('constructing hsva color', () => {
        const topic = chroma(0, 1, 1, 0.25, 'hsv');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
    });
    describe('constructing hsia color', () => {
        const topic = chroma(0, 1, 0.3333334, 0.25, 'hsi');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
    });
    describe('constructing laba color', () => {
        const topic = chroma(53.24079414130722, 80.09245959641109, 67.20319651585301, 0.25, 'lab');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
    });
    describe('constructing lcha color', () => {
        const topic = chroma(53.24079414130722, 104.55176567686985, 39.99901061253297, 0.25, 'lch');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
    });
    describe('constructing cmyka color', () => {
        const topic = chroma(0, 1, 1, 0, 0.25, 'cmyk');
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
    });
    describe('gl output', () => {
        const topic = chroma.gl(1, 0, 0, 0.25);
        test('color is red', () => {
            assert.equal(topic.name(), 'red');
        });
        test('alpha is 25%', () => {
            assert.equal(topic.alpha(), 0.25);
        });
        test('gloutput', () => {
            assert.deepEqual(topic.gl(), [1, 0, 0, 0.25]);
        });
    });
    describe('rgba css output', () => {
        const topic = chroma.css('hsla(0,100%,50%,0.25)');
        test('cssoutput', () => {
            assert.equal(topic.css(), 'rgba(255,0,0,0.25)');
        });
    });
    describe('hex output', () => {
        const topic = chroma.gl(1, 0, 0, 0.25);
        test('hex', () => {
            assert.equal(topic.hex(), '#ff000040');
        });
        test('rgb', () => {
            assert.equal(topic.hex('rgb'), '#ff0000');
        });
        test('rgba', () => {
            assert.equal(topic.hex('rgba'), '#ff000040');
        });
        test('argb', () => {
            assert.equal(topic.hex('argb'), '#40ff0000');
        });
    });
    describe('num output', () => {
        const topic = chroma.gl(1, 0, 0, 0.25);
        test('num ignores alpha', () => {
            assert.equal(topic.num(), 0xff0000);
        });
    });
    describe('setting alpha returns new instance', () => {
        const topic = chroma('red');
        test('set alpha to 0.5', () => {
            topic.alpha(0.5);
            assert.equal(topic.alpha(), 1);
        });
    });
});
