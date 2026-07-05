import { access, accessArray, type MaybeAccessor } from "@solid-primitives/utils";
import {
  add as _add,
  substract as _substract,
  multiply as _multiply,
  divide as _divide,
  power as _power,
  clamp as _clamp,
} from "@solid-primitives/utils/immutable";
import { type Accessor, createMemo } from "solid-js";

/** signal-builder `a + b + c + ...` */
export function add(...a: MaybeAccessor<number>[]): Accessor<number>;
export function add(...a: MaybeAccessor<string>[]): Accessor<string>;
export function add(...a: MaybeAccessor<any>[]): Accessor<string | number> {
  return createMemo(() => _add(...accessArray(a)));
}

/** signal-builder `a - b - c - ...` */
export const substract = (a: MaybeAccessor<number>, ...b: MaybeAccessor<number>[]): Accessor<number> =>
  createMemo(() => _substract(access(a), ...accessArray(b)));

/** signal-builder `a * b * c * ...` */
export const multiply = (a: MaybeAccessor<number>, ...b: MaybeAccessor<number>[]): Accessor<number> =>
  createMemo(() => _multiply(access(a), ...accessArray(b)));

/** signal-builder `a / b / c / ...` */
export const divide = (a: MaybeAccessor<number>, ...b: MaybeAccessor<number>[]): Accessor<number> =>
  createMemo(() => _divide(access(a), ...accessArray(b)));

/** signal-builder `a ** b ** c ** ...` */
export const power = (a: MaybeAccessor<number>, ...b: MaybeAccessor<number>[]): Accessor<number> =>
  createMemo(() => _power(access(a), ...accessArray(b)));

/** Signal Builder: `Math.round()` */
export const round = (a: MaybeAccessor<number>): Accessor<number> => createMemo(() => Math.round(access(a)));
/** Signal Builder: `Math.ceil()` */
export const ceil = (a: MaybeAccessor<number>): Accessor<number> => createMemo(() => Math.ceil(access(a)));
/** Signal Builder: `Math.floor()` */
export const floor = (a: MaybeAccessor<number>): Accessor<number> => createMemo(() => Math.floor(access(a)));

/**
 * Signal builder: clamps a number value between two other values
 */
export const clamp = (
  value: MaybeAccessor<number>,
  min: MaybeAccessor<number>,
  max: MaybeAccessor<number>,
): Accessor<number> => createMemo(() => _clamp(access(value), access(min), access(max)));
