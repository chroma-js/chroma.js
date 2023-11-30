import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for chroma.num()', () => {
    describe('number output', () => {
        const topic = chroma.hsl(0, 1, 0.5, 0.5);
        describe('numoutput', () => {
            assert.equal(topic.num(), 0xff0000);
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
        test(hex, () => {
            assert.equal(topic[0].hex(), '#ff0000');
        });
        test(num, () => {
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
})['export'](module);
