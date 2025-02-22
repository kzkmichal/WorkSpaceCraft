export const isString = (value: unknown): value is string => {
	return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
	return typeof value === "number" && !Number.isNaN(value);
};

export const isBoolean = (value: unknown): value is boolean => {
	return typeof value === "boolean";
};

export const isObject = (value: unknown): value is object => {
	return typeof value === "object" && value !== null;
};

export const isArray = <T>(value: unknown): value is Array<T> => {
	return Array.isArray(value);
};

export const isNonNullable = <T>(
	value: T,
): value is NonNullable<T> => {
	return value !== null && value !== undefined;
};

export const hasProperty = <K extends string>(
	value: unknown,
	prop: K,
): value is { [key in K]: unknown } => {
	return isObject(value) && prop in value;
};

export const isError = (value: unknown): value is Error => {
	return value instanceof Error;
};
