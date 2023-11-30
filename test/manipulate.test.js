import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for chroma.color()', () => {
    describe('modify colors', () => {
        function topic() {
            return chroma('#ff0000');
        }
        test('darken', () => {
            assert.equal(topic.darken().hex(), '#c20000');
        });
        test('darker', () => {
            assert.equal(topic.darker().hex(), '#c20000');
        });
        test('darken more', () => {
            assert.equal(topic.darker(2).hex(), '#890000');
        });
        test('darken too much', () => {
            assert.equal(topic.darker(10).hex(), '#000000');
        });
        test('brighten', () => {
            assert.equal(topic.brighten().hex(), '#ff5a36');
        });
        test('brighten too much', () => {
            assert.equal(topic.brighten(10).hex(), '#ffffff');
        });
        test('brighter', () => {
            assert.equal(topic.brighter().hex(), '#ff5a36');
        });
        test('saturate', () => {
            assert.equal(topic.saturate().hex(), '#ff0000');
        });
        test('desaturate', () => {
            assert.equal(topic.desaturate().hex(), '#ee3a20');
        });
        test('desaturate more', () => {
            assert.equal(topic.desaturate(2).hex(), '#db5136');
        });
        test('desaturate too much', () => {
            assert.equal(topic.desaturate(400).hex(), '#7f7f7f');
        });
    });

    describe('premultiply', () => {
        const topic = chroma('rgba(32, 48, 96, 0.5)');
        test('premultiply rgba', () => {
            assert.deepEqual(topic.premultiply().rgba(), [16, 24, 48, 0.5]);
        });
        test('premultiply hex', () => {
            assert.equal(topic.premultiply().hex(), '#10183080');
        });
        test('premultiply hex rgb', () => {
            assert.equal(topic.premultiply().hex('rgb'), '#101830');
        });
        test('premultiply num', () => {
            assert.equal(topic.premultiply().num(), 0x101830);
        });
    });
});
