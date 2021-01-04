import { ConfirmQuestion, CheckboxQuestion } from "inquirer/index";
import * as choices from "./choices";
import { GeneratorModule } from "../generator.module";
import { Conformation, Dependencies } from "../../types";

/** Module dependencies. */
const dependencies: Dependencies = {
    dev: ["typescript", "ts-node", "@types/node"],
    prod: ["fp-ts"],
};

/**
 * Set of dependencies.
 *
 * @interface DependencySet
 */
interface DependencySet {
    value: [];
}

/**
 * FP module props.
 *
 * @export
 * @interface Props
 */
interface Props {
    libraries: DependencySet;
    bindings: DependencySet;
}

/**
 * FP module implementation.
 *
 * @export
 * @class FPModule
 * @extends {GeneratorModule<Props>}
 */
export class FPModule extends GeneratorModule<Props> {
    /**
     * Initializes the module properties.
     *
     * @protected
     * @returns {Props} Initialized properties
     * @memberof FPModule
     */
    protected initProps(): Props {
        return {
            libraries: {
                value: [],
            },
            bindings: {
                value: [],
            },
        };
    }

    /**
     * Will be called when the owning generator is prompting for user input.
     *
     * @returns {Promise<void>}
     * @memberof FPModule
     */
    public async prompt(): Promise<void> {
        this.props.libraries = await this.promptLibraries();
        this.props.bindings = await this.promptBindings();
    }

    /**
     * Will be called in the configuration phase.
     *
     * @memberof FPModule
     */
    public configure(): void {
        // Nothing to configure.
    }

    /**
     * Will be called in the write phase.
     *
     * @memberof FPModule
     */
    public write(): void {
        this.generator.fs.copy(
            this.generator.templatePath("src/**/*"),
            `${this.root}/src`
        );

        this.generator.fs.copy(
            this.generator.templatePath("tsconfig.json"),
            this.generator.destinationPath("tsconfig.json")
        );
    }

    /**
     * Will be called in the install phase.
     *
     * @memberof FPModule
     */
    public install(): void {
        const dev = dependencies.dev;
        this.generator.yarnInstall(dev, { dev: true });

        const prod = dependencies.prod;
        prod.push(...this.props.libraries.value);
        prod.push(...this.props.bindings.value);
        this.generator.yarnInstall(prod);
    }

    /**
     * Prompts the user for libraries to add.
     *
     * @private
     * @returns {Promise<string[]>} Libraries to add
     * @memberof FPModule
     */
    private async promptLibraries(): Promise<DependencySet> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message:
                "Would you like to add any libraries from the fp-ts ecosystem? | https://gcanti.github.io/fp-ts/ecosystem/",
            default: true,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        if (answer.confirmed) {
            const libraries: CheckboxQuestion = {
                type: "checkbox",
                name: "value",
                message: "Select fp-ts libraries to add?",
                choices: choices.libraries,
            };

            return await this.generator.prompt<DependencySet>(libraries);
        }

        return this.props.libraries;
    }

    /**
     * Prompts the user for bindings to add.
     *
     * @private
     * @returns {Promise<string[]>} Bindigns to add
     * @memberof FPModule
     */
    private async promptBindings(): Promise<DependencySet> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message:
                "Would you like to add any bindings from the fp-ts ecosystem? | https://gcanti.github.io/fp-ts/ecosystem/",
            default: false,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        if (answer.confirmed) {
            const bindings: CheckboxQuestion = {
                type: "checkbox",
                name: "value",
                message: "Select fp-ts bindings to add?",
                choices: choices.bindings,
            };

            return await this.generator.prompt<DependencySet>(bindings);
        }

        return this.props.bindings;
    }
}
