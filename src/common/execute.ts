import { ServerActionError } from './error';
import type {
    ServerAction,
    ServerActionDataType,
    ServerActionInputType,
} from './types';

/**
 * Execute the server action immediately and return the output data, or throw an error if the action failed.
 * Works well with React.js `startTransition`.
 * @param action The server action to execute.
 * @param input The input to pass to the server action.
 * @returns The output data of the server action.
 * @example
 * executeServerAction(action, input)
 *   .then(data => {}) // do something with the data
 *   .catch(error => {}) // handle the error
 */
export async function executeServerAction<
    TAction extends ServerAction<any, any>,
    TInput extends ServerActionInputType<TAction>,
    TData extends ServerActionDataType<TAction>
>(action: TAction, input: TInput): Promise<TData> {
    return action(input).then(output => {
        if (output.success) return output.data;
        throw ServerActionError.fromObject(output.error);
    });
}