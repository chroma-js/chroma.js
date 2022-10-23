const Kn = 18;

// D65 standard referent
const Xn = 0.950470;
const Yn = 1;
const Zn = 1.088830;

const t0 = 0.137931034;  // 4 / 29
const t1 = 0.206896552;  // 6 / 29
const t2 = 0.12841855;   // 3 * t1 * t1
const t3 = 0.008856452;  // t1 * t1 * t1

export default {
    // Corresponds roughly to RGB brighter/darker
    Kn,

    // D65 standard referent
    Xn,
    Yn,
    Zn,

    t0,  // 4 / 29
    t1,  // 6 / 29
    t2,   // 3 * t1 * t1
    t3,  // t1 * t1 * t1
}

