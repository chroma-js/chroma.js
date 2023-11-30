import assert from 'assert';

require('../index');
import Color from '../src/Color.js';

describe('Testing Color', () => {
    describe('re-use existing color instance', () => {
        test('same', () => {
            const c0 = new Color('red');
            assert.strictEqual(c0, new Color(c0));
        });
    });
    describe('autodetect named colors', () => {
        function topic() {
            return new Color('mediumslateblue');
        }
        test('noErrThrown', () => {
            assert.doesNotThrow(topic);
        });
        test('hexCode', () => {
            assert.strictEqual(topic().hex(), '#7b68ee');
        });
    });
    describe('throw err on wrong color name', () => {
        function topic() {
            return new Color('fakecolor');
        }
        test('errThrown', () => {
            assert.throws(topic);
        });
    });
    describe('autodetect correct hex colors', () => {
        const hexes = ['#ff9900', '#FF9900', '#F90', 'f90', 'FF9900', 'FF9900F0', 'F90F', '#F90F'];
        for (const hex of hexes) {
            describe(`detect hex ${hex}`, () => {
                function topic() {
                    return new Color(hex);
                }
                test('noErrThrown', () => {
                    assert.doesNotThrow(topic);
                });
                test('hexCode', () => {
                    assert.strictEqual(topic().hex('rgb'), '#ff9900');
                });
            });
        }
    });
});
