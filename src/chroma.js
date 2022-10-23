import { Color } from "./Color.js";

export const chroma = (...args) => {
	return new chroma.Color(...args);
};

chroma.Color = Color;
chroma.version = '@@version'
