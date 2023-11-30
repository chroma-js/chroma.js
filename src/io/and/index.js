import {chroma} from '../../chroma.js';
import {Color} from '../../Color.js';
import input from '../input.js';
import {type} from '../../utils/index.js';

import rgb2and from './rgb2and.js';

Color.prototype.android = function(mode) {
    return rgb2and(this._rgb, mode);
};

chroma.android = (...args) => new Color(...args, 'android');

import and2rgb from './and2rgb.js'
input.format.android = and2rgb;

input.autodetect.push({
    p: 5,
    test: (...args) => {
        if (args.length === 1 && type(args[0]) === 'number') {
            const alpha = (args[0] >> 24 & 0xFF) / 255;
            if (alpha >= 0 && alpha <= 1) {
                const a = args[0] - 0xFF000000;
                const r = a >> 16 & 0xFF;
                const g = (a >> 8) & 0xFF;
                const b = a & 0xFF;
                if ([r,g,b].every((val) => val >= 0 && val <= 255)) {
                    return 'android';
                }
            }
        }
    }
});