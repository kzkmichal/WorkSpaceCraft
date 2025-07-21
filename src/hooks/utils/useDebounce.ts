import { useState, useEffect, useRef, useCallback } from "react";

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

/**
 * Debounce a callback function
 */
export function useDebouncedCallback<
	T extends (...args: any[]) => void,
>(callback: T, delay: number): T {
	const timeoutRef = useRef<NodeJS.Timeout>();

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	) as T;

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedCallback;
}

/**
 * Debounce a callback with immediate execution option
 */
export function useDebouncedCallbackWithImmediate<
	T extends (...args: any[]) => void,
>(callback: T, delay: number, immediate = false): T {
	const timeoutRef = useRef<NodeJS.Timeout>();
	const immediateRef = useRef<boolean>(immediate);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			const callNow = immediate && !timeoutRef.current;

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				timeoutRef.current = undefined;
				if (!immediate) callback(...args);
			}, delay);

			if (callNow) callback(...args);
		},
		[callback, delay, immediate],
	) as T;

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedCallback;
}
