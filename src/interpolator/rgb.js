import { Color } from '../Color.js';
import rgb from './index.js';

const _rgb = (col1, col2, f) => {
    const xyz0 = col1._rgb;
    const xyz1 = col2._rgb;
    return new Color(
        xyz0[0] + f * (xyz1[0]-xyz0[0]),
        xyz0[1] + f * (xyz1[1]-xyz0[1]),
        xyz0[2] + f * (xyz1[2]-xyz0[2]),
        'rgb'
    )
}

// register interpolator
rgb.rgb = _rgb;

export default rgb;
