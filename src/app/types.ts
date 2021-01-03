/**
 * Conformation type for Inquirer.js prompts.
 *
 * @export
 * @interface Conformation
 */
export interface Conformation {
    confirmed: boolean;
}

/**
 * npm dependencies.
 *
 * @export
 * @interface Dependencies
 */
export interface Dependencies {
    dev: string[];
    prod: string[];
}
