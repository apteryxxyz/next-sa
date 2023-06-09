import type { ServerActionError } from './error';

/**
 * Represents a server action built using next-sa.
 */
export type ServerAction<TInput, TData> = (
    input: TInput
) => Promise<ServerActionPayload<TData>>;

/**
 * Represents the return type of a server action built using next-sa.
 */
export type ServerActionPayload<TData> =
    | {
          success: false;
          error: ReturnType<typeof ServerActionError.prototype.toObject>;
      }
    | { success: true; data: TData };

/**
 * Extract the input type of a server action.
 */
export type ServerActionInputType<TAction extends ServerAction<any, any>> =
    TAction extends ServerAction<infer TInput, any>
        ? TInput extends undefined
            ? never
            : TInput
        : never;

/**
 * Extract the output type of a server action.
 */
export type ServerActionDataType<TAction extends ServerAction<any, any>> =
    TAction extends ServerAction<any, infer TOutput>
        ? TOutput extends undefined
            ? never
            : TOutput
        : never;