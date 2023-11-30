import assert from 'assert';
import unpack from '../src/utils/unpack.js';

// const round = (digits) => {
//     const d = Math.pow(10,digits);
//     return (v) => Math.round(v*d) / d;
// }

describe('Testing unpack', () => {
    describe('parse simple CMYK colors', () => {
        test('args', () => {
            assert.deepEqual(unpack([1, 2, 3, 4]), [1, 2, 3, 4]);
        });
        test('array', () => {
            assert.deepEqual(unpack([[1, 2, 3, 4]]), [1, 2, 3, 4]);
        });
        test('object', () => {
            assert.deepEqual(unpack([{ c: 1, m: 2, y: 3, k: 4 }], 'cmyk'), [1, 2, 3, 4]);
        });
    });
});
