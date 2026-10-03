import { useCallback, useEffect, useRef, useState } from "react";

type UseControllableStateParams<T> = {
	/** Controlled value. When defined, the hook never owns the state. */
	prop?: T | undefined;
	/** Initial value when uncontrolled. */
	defaultProp: T;
	/** Called with the next value whenever it changes (controlled or not). */
	onChange?: (value: T) => void;
};

type SetStateFn<T> = (next: T | ((prev: T) => T)) => void;

/**
 * Controlled/uncontrolled state, same call shape as Radix' `useControllableState`:
 * `const [open, setOpen] = useControllableState({ prop: open, defaultProp: false, onChange })`.
 * The Edmi AI pack ships its own copy so it does not depend on any Radix package.
 */
export function useControllableState<T>({
	prop,
	defaultProp,
	onChange,
}: UseControllableStateParams<T>): [T, SetStateFn<T>] {
	const [uncontrolled, setUncontrolled] = useState<T>(defaultProp);
	const isControlled = prop !== undefined;
	const value = isControlled ? (prop as T) : uncontrolled;

	// Keep the latest callback and value without re-creating the setter.
	const onChangeRef = useRef(onChange);
	const valueRef = useRef(value);
	useEffect(() => {
		onChangeRef.current = onChange;
		valueRef.current = value;
	});

	const setValue = useCallback<SetStateFn<T>>(
		(next) => {
			const resolved =
				typeof next === "function"
					? (next as (prev: T) => T)(valueRef.current)
					: next;
			if (Object.is(resolved, valueRef.current)) return;
			if (!isControlled) setUncontrolled(resolved);
			valueRef.current = resolved;
			onChangeRef.current?.(resolved);
		},
		[isControlled],
	);

	return [value, setValue];
}
