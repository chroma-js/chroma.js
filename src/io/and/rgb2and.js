import {unpack, last} from '../../utils/index.js';
const {round} = Math;

const rgb2and = (...args) => {
    const rgba = unpack(args, 'rgba');
    let mode = (rgba[3] !== 1 ? last(args) : 'rgb') || 'rgb';
    rgba[0] = round(rgba[0]);
    rgba[1] = round(rgba[1]);
    rgba[2] = round(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1 && last(args) !== 'rgb')) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return 	mode === 'rgba' 
		? ((rgba[3] << 24) | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2])) 
		: (0xff000000 | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2]));
}

export default rgb2and;