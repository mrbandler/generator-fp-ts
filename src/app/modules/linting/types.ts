/**
 * prettier arrow function parentheses configrations.
 *
 * @enum {number}
 */
export enum ArrowParens {
    always = "always",
    avoid = "avoid",
}

/**
 * Prettier props.
 *
 * @interface PrettierProps
 */
export interface PrettierProps {
    tabWidth: number;
    useTabs: boolean;
    semi: boolean;
    singleQuote: boolean;
    arrowParens: ArrowParens;
}

/**
 * ESLint props.
 *
 * @interface ESLintProps
 */
export interface ESLintProps {
    rulesets: string[];
}

/**
 * ESLint rules.
 *
 * @export
 * @interface ESLintRules
 */
export interface ESLintRules {
    [key: string]: any[];
}

/**
 * ESLint configuration.
 *
 * @export
 * @interface ESLintConfig
 */
export interface ESLintConfig {
    root: boolean;
    parser: string;
    plugins: string[];
    extends: string[];
    rules: ESLintRules;
}
