import { chroma } from '../../chroma.js';
import { Color } from '../../Color.js';
import { type } from '../../utils/index.js';
import input from '../input.js';

import rgb2hex from './rgb2hex.js';
import hex2rgb from './hex2rgb.js';

Color.prototype.hex = function(mode) {
    return rgb2hex(this._rgb, mode);
};

chroma.hex = (...args) => new Color(...args, 'hex');

input.format.hex = hex2rgb;
input.autodetect.push({
    p: 4,
    test: (h, ...rest) => {
        if (!rest.length && type(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
            return 'hex';
        }
    }
})
