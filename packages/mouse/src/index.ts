/**
 * A collection of Solid Primitives, that capture current mouse cursor position, and help to deal with common related usecases.
 *
 * @module @solid-primitives/mouse
 */

export * from "./types.ts";
export {
  makeMousePositionListener,
  makeMouseInsideListener,
  getPositionToElement,
  getPositionToScreen,
  getPositionInElement,
} from "./common.ts";
export * from "./primitives.ts";
