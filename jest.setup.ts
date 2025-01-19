import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

type CustomGlobal = Global & {
	TextEncoder: typeof TextEncoder;
	TextDecoder: typeof TextDecoder;
};

declare const global: CustomGlobal;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

beforeAll(() => {
	console.error = jest.fn();
	console.warn = jest.fn();
});

afterEach(() => {
	jest.clearAllMocks();
});
