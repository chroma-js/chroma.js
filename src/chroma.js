import { Color } from "./Color.js";

export const chroma = (...args) => {
	return new chroma.Color(...args);
};

export default chroma;

chroma.Color = Color;
chroma.version = '@@version'
