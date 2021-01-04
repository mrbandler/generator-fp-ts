import { ConfirmQuestion, CheckboxQuestion } from "inquirer";
import * as _ from "lodash";
import * as choices from "./choices";
import { ArrowParens, ESLintConfig, ESLintProps, PrettierProps } from "./types";
import { GeneratorModule } from "../generator.module";
import { Conformation, Dependencies } from "../../types";

/** Module dependencies. */
const dependencies: Dependencies = {
    dev: [
        "prettier",
        "eslint",
        "eslint-config-prettier",
        "eslint-plugin-functional",
        "eslint-plugin-prettier",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
    ],
    prod: [],
};

/**
 * Module props.
 *
 * @interface Props
 */
interface Props {
    enabled: boolean;
    hooks: boolean;
    commitlint: boolean;
    prettier: PrettierProps;
    eslint: ESLintProps;
}

/**
 * Linting module implementation.
 *
 * @export
 * @class LintingModule
 * @extends {GeneratorModule<Props>}
 */
export class LintingModule extends GeneratorModule<Props> {
    /**
     * Initialzes the module props.
     *
     * @protected
     * @returns {Props} Initialized props
     * @memberof LintingModule
     */
    protected initProps(): Props {
        return {
            enabled: false,
            hooks: true,
            commitlint: true,
            prettier: {
                tabWidth: 2,
                useTabs: false,
                semi: true,
                singleQuote: false,
                arrowParens: ArrowParens.always,
            },
            eslint: {
                rulesets: [],
            },
        };
    }

    /**
     * Will be called when the owning generator is prompting the user.
     *
     * @returns {Promise<void>}
     * @memberof LintingModule
     */
    public async prompt(): Promise<void> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "linting",
            message:
                "Would you like to add linting and pretty-printing capabilities via ESLint, prettier and commitlint?",
        };

        const answer = await this.generator.prompt(question);
        if (answer.linting) {
            this.props.enabled = true;
            this.props.prettier = await this.promptPrettierProps();
            this.props.eslint = await this.promptEslintProps();
            this.props.hooks = await this.promptHooks();
            this.props.commitlint = await this.promptCommitlint();
        }
    }

    /**
     * Will be called in the configuration phase.
     *
     * @returns {void}
     * @memberof LintingModule
     */
    public configure(): void {
        // Check if the user enabled linting capabilities if not bail.
        if (!this.props.enabled) return;

        // Copy all dotfiles from the templates to the destination directory.
        this.generator.fs.copy(this.generator.templatePath(".*"), this.root);

        // Generate and write the editor configuration based on prettier props.
        const editorConfig = this.editorConfig();
        this.generator.fs.write(
            this.generator.destinationPath(".editorconfig"),
            editorConfig
        );

        // Write prettier configuration.
        this.generator.fs.writeJSON(
            this.generator.destinationPath(".prettierrc"),
            this.props.prettier
        );

        // If the user selected a FP plugin ruleset add it to the ESLint configuration.
        if (!_.isEmpty(this.props.eslint.rulesets)) {
            const eslintJson = this.generator.fs.readJSON(
                this.generator.destinationPath(".eslintrc")
            ) as unknown;

            if (eslintJson) {
                const eslint = eslintJson as ESLintConfig;
                eslint.extends.push(...this.props.eslint.rulesets);

                this.generator.fs.extendJSON(
                    this.generator.destinationPath(".eslintrc"),
                    { extends: eslint.extends }
                );
            }
        }

        // If the user enabled pre-commit hooks add configuration to package.json.
        if (this.props.hooks) {
            const hooks = {
                husky: {
                    hooks: {
                        "pre-commit": "lint-staged",
                    },
                },
                "lint-staged": {
                    "*.{js,ts,css,json,yml}": ["prettier --write"],
                    "*.{js,ts}": ["eslint --fix"],
                },
            };

            this.generator.fs.extendJSON(
                this.generator.destinationPath("package.json"),
                hooks
            );
        }

        // If the user enabled commitlint add additional pre-commit hook configuration
        // to the package.json and copy the commitlint configuration.
        if (this.props.commitlint) {
            const commitlint = {
                husky: {
                    hooks: {
                        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
                    },
                },
            };

            this.generator.fs.extendJSON(
                this.generator.destinationPath("package.json"),
                commitlint
            );

            this.generator.fs.copy(
                this.generator.templatePath("commitlint.config.js"),
                this.generator.destinationPath("commitlint.config.js")
            );
        }
    }

    /**
     * Will be called in the writing phase.
     *
     * @memberof LintingModule
     */
    public write(): void {
        // Nothing to write here.
    }

    /**
     * Will be called in the install phase.
     *
     * @memberof LintingModule
     */
    public install(): void {
        if (!this.props.enabled) return;

        const dev = dependencies.dev;

        if (this.props.hooks) {
            dev.push(...["husky", "lint-staged"]);
        }

        if (this.props.commitlint) {
            dev.push(...["@commitlint/cli", "@commitlint/config-conventional"]);
        }

        this.generator.yarnInstall(dev, { dev: true });
    }

    /**
     * Promps the user for prettier props.
     *
     * @private
     * @returns {Promise<PrettierProps>} User prettier props
     * @memberof LintingModule
     */
    private async promptPrettierProps(): Promise<PrettierProps> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "prettier",
            message:
                "Would you like to customize the default prettier configuration?",
        };

        const answer = await this.generator.prompt(question);
        if (answer.prettier) {
            return await this.generator.prompt<PrettierProps>([
                {
                    type: "number",
                    name: "tabWidth",
                    message: "Prettier configuration => Tab Width:",
                    default: 2,
                },
                {
                    type: "confirm",
                    name: "useTabs",
                    message: "Prettier configuration => Tabs:",
                    default: false,
                },
                {
                    type: "confirm",
                    name: "semi",
                    message: "Prettier configuration => Semicolons:",
                    default: true,
                },
                {
                    type: "confirm",
                    name: "singleQuote",
                    message: "Prettier configuration => Single Quotes:",
                    default: false,
                },
                {
                    type: "list",
                    name: "arrowParens",
                    message:
                        "Prettier configuration > Arrow Function Parentheses:",
                    choices: [
                        {
                            name:
                                "always - Always include parens. Example: (x) => x",
                            value: "always",
                            short: "always",
                        },
                        {
                            name:
                                "avoid - Omit parens when possible. Example: x => x",
                            value: "avoid",
                            short: "avoid",
                        },
                    ],
                    default: 0,
                },
            ]);
        }

        return this.props.prettier;
    }

    /**
     * Prompts the user for ESLint props.
     *
     * @private
     * @returns {Promise<ESLintProps>} User ESLint props
     * @memberof LintingModule
     */
    private async promptEslintProps(): Promise<ESLintProps> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message:
                "Would you like to add rulesets for the ESLint FP plugin? | https://github.com/jonaskello/eslint-plugin-functional#supported-rules",
            default: true,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        if (answer.confirmed) {
            const bindings: CheckboxQuestion = {
                type: "checkbox",
                name: "rulesets",
                message: "Select the ruleset you want to add?",
                choices: choices.rulesets,
            };

            return await this.generator.prompt<ESLintProps>(bindings);
        }

        return this.props.eslint;
    }

    /**
     * Prompts the user if he/she would like to install Git hooks for linting.
     *
     * @private
     * @returns {Promise<boolean>} Flag, whether to install hooks or not
     * @memberof LintingModule
     */
    private async promptHooks(): Promise<boolean> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message:
                "Would you like to add pre-commit Git hooks to run the linters on every commit?",
            default: true,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        return answer.confirmed;
    }

    /**
     * Prompts the user if he/seh would like to install commitlint.
     *
     * @private
     * @returns {Promise<boolean>}
     * @memberof LintingModule
     */
    private async promptCommitlint(): Promise<boolean> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message:
                "Would you like to add commitlint? | https://commitlint.js.org",
            default: true,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        return answer.confirmed;
    }

    /**
     * Generates the .editorconfig contents via the prettier props.
     *
     * @private
     * @returns {string} Generated .editorconfig contents
     * @memberof LintingModule
     */
    private editorConfig(): string {
        const editorConfig = [];
        editorConfig.push("[*]");
        editorConfig.push(
            `indent_style = ${this.props.prettier.useTabs ? "tab" : "space"}`
        );
        editorConfig.push(`indent_size = ${this.props.prettier.tabWidth}`);

        return editorConfig.join("\n");
    }
}
