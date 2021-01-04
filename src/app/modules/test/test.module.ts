import { ConfirmQuestion } from "inquirer";
import { GeneratorModule } from "../generator.module";
import { Conformation, Dependencies } from "../../types";

/** Module dependencies. */
const dependencies: Dependencies = {
    dev: [
        "jest",
        "@types/jest",
        "ts-jest",
        "@relmify/jest-fp-ts",
        "fast-check",
        "fp-ts-laws",
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
}

/**
 * VS Code module implementation.
 *
 * @export
 * @class TestModule
 * @extends {GeneratorModule<Props>}
 */
export class TestModule extends GeneratorModule<Props> {
    /**
     * Initializes the module props.
     *
     * @protected
     * @returns {Props} Initialized props
     * @memberof TestModule
     */
    protected initProps(): Props {
        return {
            enabled: false,
        };
    }

    /**
     * Will be called when the owning generator is prompting the user.
     *
     * @returns {Promise<void>}
     * @memberof TestModule
     */
    public async prompt(): Promise<void> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message:
                "Would you like to add testing capabilities via Jest and fast-check?",
            default: true,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        this.props.enabled = answer.confirmed;
    }

    /**
     * Will be called in the configuration phase.
     *
     * @returns {void}
     * @memberof TestModule
     */
    public configure(): void {
        if (!this.props.enabled) return;

        this.generator.fs.extendJSON(
            this.generator.destinationPath("package.json"),
            {
                scripts: {
                    test: "jest",
                    "test:watch": "jest --watch",
                    "test:watch:all": "jest --watch-all",
                    coverage: "jest --collect-coverage",
                },
            }
        );
    }

    /**
     * Will be called in the writing phase.
     *
     * @memberof TestModule
     */
    public write(): void {
        if (!this.props.enabled) return;

        this.generator.fs.copy(
            this.generator.templatePath("jest.*"),
            this.root
        );

        this.generator.fs.copy(
            this.generator.templatePath("tests/**/*"),
            `${this.root}/tests`
        );
    }

    /**
     * Will be called in the install phase.
     *
     * @memberof TestModule
     */
    public install(): Dependencies {
        if (!this.props.enabled) {
            return {
                dev: [],
                prod: [],
            };
        }

        return dependencies;
    }
}
