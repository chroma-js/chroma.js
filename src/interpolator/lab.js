import '../io/lab/index.js';

import { Color } from '../Color.js';
import lab from './index.js';

const _lab = (col1, col2, f) => {
    const xyz0 = col1.lab();
    const xyz1 = col2.lab();
    return new Color(
        xyz0[0] + f * (xyz1[0]-xyz0[0]),
        xyz0[1] + f * (xyz1[1]-xyz0[1]),
        xyz0[2] + f * (xyz1[2]-xyz0[2]),
        'lab'
    )
}

// register interpolator
lab.lab = _lab;

export default lab;
