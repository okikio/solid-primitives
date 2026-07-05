/**
 * Primitives for Server-Sent Events (SSE) using the browser's EventSource API.
 *
 * @module @solid-primitives/sse
 */

export {
  makeSSE,
  createSSE,
  SSEReadyState,
  type SSEOptions,
  type SSEReconnectOptions,
  type SSESourceHandle,
  type SSESourceFn,
  type SSEReadyStateValue,
  type CreateSSEOptions,
  type SSEReturn,
} from "./sse.ts";

export { json, ndjson, lines, number, safe, pipe } from "./transform.ts";
