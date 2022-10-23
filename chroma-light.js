// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const __default = (x, min = 0, max = 1)=>{
    return x < min ? min : x > max ? max : x;
};
const __default1 = (rgb)=>{
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);
    for(let i = 0; i <= 3; i++){
        if (i < 3) {
            if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
            rgb[i] = __default(rgb[i], 0, 255);
        } else if (i === 3) {
            rgb[i] = __default(rgb[i], 0, 1);
        }
    }
    return rgb;
};
const classToType = {};
for (let name of [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Undefined',
    'Null'
]){
    classToType[`[object ${name}]`] = name.toLowerCase();
}
function __default2(obj) {
    return classToType[Object.prototype.toString.call(obj)] || "object";
}
const __default3 = (args, keyOrder = null)=>{
    if (args.length >= 3) return Array.prototype.slice.call(args);
    if (__default2(args[0]) == 'object' && keyOrder) {
        return keyOrder.split('').filter((k)=>args[0][k] !== undefined).map((k)=>args[0][k]);
    }
    return args[0];
};
const __default4 = (args)=>{
    if (args.length < 2) return null;
    const l = args.length - 1;
    if (__default2(args[l]) == 'string') return args[l].toLowerCase();
    return null;
};
const __default5 = {
    format: {},
    autodetect: []
};
class Color {
    constructor(...args){
        const me = this;
        if (__default2(args[0]) === 'object' && args[0].constructor && args[0].constructor === this.constructor) {
            return args[0];
        }
        let mode = __default4(args);
        let autodetect = false;
        if (!mode) {
            autodetect = true;
            if (!__default5.sorted) {
                __default5.autodetect = __default5.autodetect.sort((a, b)=>b.p - a.p);
                __default5.sorted = true;
            }
            for (let chk of __default5.autodetect){
                mode = chk.test(...args);
                if (mode) break;
            }
        }
        if (__default5.format[mode]) {
            const rgb = __default5.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
            me._rgb = __default1(rgb);
        } else {
            throw new Error('unknown format: ' + args);
        }
        if (me._rgb.length === 3) me._rgb.push(1);
    }
    toString() {
        if (__default2(this.hex) == 'function') return this.hex();
        return `[${this._rgb.join(',')}]`;
    }
}
const chroma = (...args)=>{
    return new chroma.Color(...args);
};
chroma.Color = Color;
chroma.version = '@@version';
const rnd = (a)=>Math.round(a * 100) / 100;
const hsl2css = (...args)=>{
    const hsla = __default3(args, 'hsla');
    let mode = __default4(args) || 'lsa';
    hsla[0] = rnd(hsla[0] || 0);
    hsla[1] = rnd(hsla[1] * 100) + '%';
    hsla[2] = rnd(hsla[2] * 100) + '%';
    if (mode === 'hsla' || hsla.length > 3 && hsla[3] < 1) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode = 'hsla';
    } else {
        hsla.length = 3;
    }
    return `${mode}(${hsla.join(',')})`;
};
const rgb2hsl = (...args)=>{
    args = __default3(args, 'rgba');
    let [r, g, b] = args;
    r /= 255;
    g /= 255;
    b /= 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const l = (max + min) / 2;
    let s, h;
    if (max === min) {
        s = 0;
        h = Number.NaN;
    } else {
        s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }
    if (r == max) h = (g - b) / (max - min);
    else if (g == max) h = 2 + (b - r) / (max - min);
    else if (b == max) h = 4 + (r - g) / (max - min);
    h *= 60;
    if (h < 0) h += 360;
    if (args.length > 3 && args[3] !== undefined) return [
        h,
        s,
        l,
        args[3]
    ];
    return [
        h,
        s,
        l
    ];
};
const { round  } = Math;
const rgb2css = (...args)=>{
    const rgba = __default3(args, 'rgba');
    let mode = __default4(args) || 'rgb';
    if (mode.substr(0, 3) == 'hsl') {
        return hsl2css(rgb2hsl(rgba), mode);
    }
    rgba[0] = round(rgba[0]);
    rgba[1] = round(rgba[1]);
    rgba[2] = round(rgba[2]);
    if (mode === 'rgba' || rgba.length > 3 && rgba[3] < 1) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return `${mode}(${rgba.slice(0, mode === 'rgb' ? 3 : 4).join(',')})`;
};
const { round: round1  } = Math;
const hsl2rgb = (...args)=>{
    args = __default3(args, 'hsl');
    const [h, s, l] = args;
    let r, g, b;
    if (s === 0) {
        r = g = b = l * 255;
    } else {
        const t3 = [
            0,
            0,
            0
        ];
        const c = [
            0,
            0,
            0
        ];
        const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const t1 = 2 * l - t2;
        const h_ = h / 360;
        t3[0] = h_ + 1 / 3;
        t3[1] = h_;
        t3[2] = h_ - 1 / 3;
        for(let i = 0; i < 3; i++){
            if (t3[i] < 0) t3[i] += 1;
            if (t3[i] > 1) t3[i] -= 1;
            if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
            else if (2 * t3[i] < 1) c[i] = t2;
            else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
            else c[i] = t1;
        }
        [r, g, b] = [
            round1(c[0] * 255),
            round1(c[1] * 255),
            round1(c[2] * 255)
        ];
    }
    if (args.length > 3) {
        return [
            r,
            g,
            b,
            args[3]
        ];
    }
    return [
        r,
        g,
        b,
        1
    ];
};
const RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
const RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
const { round: round2  } = Math;
const css2rgb = (css)=>{
    css = css.toLowerCase().trim();
    let m;
    if (__default5.format.named) {
        try {
            return __default5.format.named(css);
        } catch (e) {}
    }
    if (m = css.match(RE_RGB)) {
        const rgb = m.slice(1, 4);
        for(let i = 0; i < 3; i++){
            rgb[i] = +rgb[i];
        }
        rgb[3] = 1;
        return rgb;
    }
    if (m = css.match(RE_RGBA)) {
        const rgb1 = m.slice(1, 5);
        for(let i1 = 0; i1 < 4; i1++){
            rgb1[i1] = +rgb1[i1];
        }
        return rgb1;
    }
    if (m = css.match(RE_RGB_PCT)) {
        const rgb2 = m.slice(1, 4);
        for(let i2 = 0; i2 < 3; i2++){
            rgb2[i2] = round2(rgb2[i2] * 2.55);
        }
        rgb2[3] = 1;
        return rgb2;
    }
    if (m = css.match(RE_RGBA_PCT)) {
        const rgb3 = m.slice(1, 5);
        for(let i3 = 0; i3 < 3; i3++){
            rgb3[i3] = round2(rgb3[i3] * 2.55);
        }
        rgb3[3] = +rgb3[3];
        return rgb3;
    }
    if (m = css.match(RE_HSL)) {
        const hsl = m.slice(1, 4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb4 = hsl2rgb(hsl);
        rgb4[3] = 1;
        return rgb4;
    }
    if (m = css.match(RE_HSLA)) {
        const hsl1 = m.slice(1, 4);
        hsl1[1] *= 0.01;
        hsl1[2] *= 0.01;
        const rgb5 = hsl2rgb(hsl1);
        rgb5[3] = +m[4];
        return rgb5;
    }
};
css2rgb.test = (s)=>{
    return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
};
Color.prototype.css = function(mode) {
    return rgb2css(this._rgb, mode);
};
chroma.css = (...args)=>new Color(...args, 'css');
__default5.format.css = css2rgb;
__default5.autodetect.push({
    p: 5,
    test: (h, ...rest)=>{
        if (!rest.length && __default2(h) === 'string' && css2rgb.test(h)) {
            return 'css';
        }
    }
});
const { round: round3  } = Math;
const rgb2hex = (...args)=>{
    let [r, g, b, a] = __default3(args, 'rgba');
    let mode = __default4(args) || 'auto';
    if (a === undefined) a = 1;
    if (mode === 'auto') {
        mode = a < 1 ? 'rgba' : 'rgb';
    }
    r = round3(r);
    g = round3(g);
    b = round3(b);
    const u = r << 16 | g << 8 | b;
    let str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    let hxa = '0' + round3(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    switch(mode.toLowerCase()){
        case 'rgba':
            return `#${str}${hxa}`;
        case 'argb':
            return `#${hxa}${str}`;
        default:
            return `#${str}`;
    }
};
const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
const hex2rgb = (hex)=>{
    if (hex.match(RE_HEX)) {
        if (hex.length === 4 || hex.length === 7) {
            hex = hex.substr(1);
        }
        if (hex.length === 3) {
            hex = hex.split('');
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        const u = parseInt(hex, 16);
        const r = u >> 16;
        const g = u >> 8 & 0xFF;
        const b = u & 0xFF;
        return [
            r,
            g,
            b,
            1
        ];
    }
    if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
            hex = hex.substr(1);
        }
        if (hex.length === 4) {
            hex = hex.split('');
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const u1 = parseInt(hex, 16);
        const r1 = u1 >> 24 & 0xFF;
        const g1 = u1 >> 16 & 0xFF;
        const b1 = u1 >> 8 & 0xFF;
        const a = Math.round((u1 & 0xFF) / 0xFF * 100) / 100;
        return [
            r1,
            g1,
            b1,
            a
        ];
    }
    throw new Error(`unknown hex color: ${hex}`);
};
Color.prototype.hex = function(mode) {
    return rgb2hex(this._rgb, mode);
};
chroma.hex = (...args)=>new Color(...args, 'hex');
__default5.format.hex = hex2rgb;
__default5.autodetect.push({
    p: 4,
    test: (h, ...rest)=>{
        if (!rest.length && __default2(h) === 'string' && [
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ].indexOf(h.length) >= 0) {
            return 'hex';
        }
    }
});
Color.prototype.hsl = function() {
    return rgb2hsl(this._rgb);
};
chroma.hsl = (...args)=>new Color(...args, 'hsl');
__default5.format.hsl = hsl2rgb;
__default5.autodetect.push({
    p: 2,
    test: (...args)=>{
        args = __default3(args, 'hsl');
        if (__default2(args) === 'array' && args.length === 3) {
            return 'hsl';
        }
    }
});
const __default6 = {
    Kn: 18,
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 0.008856452
};
const { pow  } = Math;
const rgb2lab = (...args)=>{
    const [r, g, b] = __default3(args, 'rgb');
    const [x, y, z] = rgb2xyz(r, g, b);
    const l = 116 * y - 16;
    return [
        l < 0 ? 0 : l,
        500 * (x - y),
        200 * (y - z)
    ];
};
const rgb_xyz = (r)=>{
    if ((r /= 255) <= 0.04045) return r / 12.92;
    return pow((r + 0.055) / 1.055, 2.4);
};
const xyz_lab = (t)=>{
    if (t > __default6.t3) return pow(t, 1 / 3);
    return t / __default6.t2 + __default6.t0;
};
const rgb2xyz = (r, g, b)=>{
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    const x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / __default6.Xn);
    const y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / __default6.Yn);
    const z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / __default6.Zn);
    return [
        x,
        y,
        z
    ];
};
const { pow: pow1  } = Math;
const lab2rgb = (...args)=>{
    args = __default3(args, 'lab');
    const [l, a, b] = args;
    let x, y, z, r, g, b_;
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = __default6.Yn * lab_xyz(y);
    x = __default6.Xn * lab_xyz(x);
    z = __default6.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    return [
        r,
        g,
        b_,
        args.length > 3 ? args[3] : 1
    ];
};
const xyz_rgb = (r)=>{
    return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow1(r, 1 / 2.4) - 0.055);
};
const lab_xyz = (t)=>{
    return t > __default6.t1 ? t * t * t : __default6.t2 * (t - __default6.t0);
};
Color.prototype.lab = function() {
    return rgb2lab(this._rgb);
};
chroma.lab = (...args)=>new Color(...args, 'lab');
__default5.format.lab = lab2rgb;
__default5.autodetect.push({
    p: 2,
    test: (...args)=>{
        args = __default3(args, 'lab');
        if (__default2(args) === 'array' && args.length === 3) {
            return 'lab';
        }
    }
});
const { cbrt , pow: pow2 , sign  } = Math;
const rgb2oklab = (...args)=>{
    const [r, g, b] = __default3(args, 'rgb');
    const [lr, lg, lb] = [
        rgb2lrgb(r / 255),
        rgb2lrgb(g / 255),
        rgb2lrgb(b / 255)
    ];
    const l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    ];
};
function rgb2lrgb(c) {
    const abs = Math.abs(c);
    if (abs < 0.04045) {
        return c / 12.92;
    }
    return (sign(c) || 1) * pow2((abs + 0.055) / 1.055, 2.4);
}
const { pow: pow3 , sign: sign1  } = Math;
const oklab2rgb = (...args)=>{
    args = __default3(args, 'lab');
    const [L, a, b] = args;
    const l = pow3(L + 0.3963377774 * a + 0.2158037573 * b, 3);
    const m = pow3(L - 0.1055613458 * a - 0.0638541728 * b, 3);
    const s = pow3(L - 0.0894841775 * a - 1.291485548 * b, 3);
    return [
        255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
        255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
        255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
        args.length > 3 ? args[3] : 1
    ];
};
function lrgb2rgb(c) {
    const abs = Math.abs(c);
    if (abs > 0.0031308) {
        return (sign1(c) || 1) * (1.055 * pow3(abs, 1 / 2.4) - 0.055);
    }
    return c * 12.92;
}
Color.prototype.oklab = function() {
    return rgb2oklab(this._rgb);
};
chroma.oklab = (...args)=>new Color(...args, 'oklab');
__default5.format.oklab = oklab2rgb;
__default5.autodetect.push({
    p: 3,
    test: (...args)=>{
        args = __default3(args, 'oklab');
        if (__default2(args) === 'array' && args.length === 3) {
            return 'oklab';
        }
    }
});
const { round: round4  } = Math;
Color.prototype.rgb = function(rnd = true) {
    if (rnd === false) return this._rgb.slice(0, 3);
    return this._rgb.slice(0, 3).map(round4);
};
Color.prototype.rgba = function(rnd = true) {
    return this._rgb.slice(0, 4).map((v, i)=>{
        return i < 3 ? rnd === false ? v : round4(v) : v;
    });
};
chroma.rgb = (...args)=>new Color(...args, 'rgb');
__default5.format.rgb = (...args)=>{
    const rgba = __default3(args, 'rgba');
    if (rgba[3] === undefined) rgba[3] = 1;
    return rgba;
};
__default5.autodetect.push({
    p: 3,
    test: (...args)=>{
        args = __default3(args, 'rgba');
        if (__default2(args) === 'array' && (args.length === 3 || args.length === 4 && __default2(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
            return 'rgb';
        }
    }
});
Color.prototype.alpha = function(a, mutate = false) {
    if (a !== undefined && __default2(a) === 'number') {
        if (mutate) {
            this._rgb[3] = a;
            return this;
        }
        return new Color([
            this._rgb[0],
            this._rgb[1],
            this._rgb[2],
            a
        ], 'rgb');
    }
    return this._rgb[3];
};
Color.prototype.darken = function(amount = 1) {
    const me = this;
    const lab = me.lab();
    lab[0] -= __default6.Kn * amount;
    return new Color(lab, 'lab').alpha(me.alpha(), true);
};
Color.prototype.brighten = function(amount = 1) {
    return this.darken(-amount);
};
Color.prototype.darker = Color.prototype.darken;
Color.prototype.brighter = Color.prototype.brighten;
Color.prototype.get = function(mc) {
    const [mode, channel] = mc.split('.');
    const src = this[mode]();
    if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
        if (i > -1) return src[i];
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
        return src;
    }
};
const __default7 = {};
const __default8 = (col1, col2, f = 0.5, ...rest)=>{
    let mode = rest[0] || 'lrgb';
    if (!__default7[mode] && !rest.length) {
        mode = Object.keys(__default7)[0];
    }
    if (!__default7[mode]) {
        throw new Error(`interpolation mode ${mode} is not defined`);
    }
    if (__default2(col1) !== 'object') col1 = new Color(col1);
    if (__default2(col2) !== 'object') col2 = new Color(col2);
    return __default7[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
};
Color.prototype.mix = Color.prototype.interpolate = function(col2, f = 0.5, ...rest) {
    return __default8(this, col2, f, ...rest);
};
Color.prototype.set = function(mc, value, mutate = false) {
    const [mode, channel] = mc.split('.');
    const src = this[mode]();
    if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
        if (i > -1) {
            if (__default2(value) == 'string') {
                switch(value.charAt(0)){
                    case '+':
                        src[i] += +value;
                        break;
                    case '-':
                        src[i] += +value;
                        break;
                    case '*':
                        src[i] *= +value.substr(1);
                        break;
                    case '/':
                        src[i] /= +value.substr(1);
                        break;
                    default:
                        src[i] = +value;
                }
            } else if (__default2(value) === 'number') {
                src[i] = value;
            } else {
                throw new Error(`unsupported value for Color.set`);
            }
            const out = new Color(src, mode);
            if (mutate) {
                this._rgb = out._rgb;
                return this;
            }
            return out;
        }
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
        return src;
    }
};
const { sqrt , pow: pow4  } = Math;
const lrgb = (col1, col2, f)=>{
    const [x1, y1, z1] = col1._rgb;
    const [x2, y2, z2] = col2._rgb;
    return new Color(sqrt(pow4(x1, 2) * (1 - f) + pow4(x2, 2) * f), sqrt(pow4(y1, 2) * (1 - f) + pow4(y2, 2) * f), sqrt(pow4(z1, 2) * (1 - f) + pow4(z2, 2) * f), 'rgb');
};
__default7.lrgb = lrgb;
const oklab = (col1, col2, f)=>{
    const xyz0 = col1.oklab();
    const xyz1 = col2.oklab();
    return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'oklab');
};
__default7.oklab = oklab;
const __default9 = (...args)=>{
    try {
        new Color(...args);
        return true;
    } catch (e) {
        return false;
    }
};
chroma.mix = chroma.interpolate = __default8;
chroma.valid = __default9;
export { chroma as default };

