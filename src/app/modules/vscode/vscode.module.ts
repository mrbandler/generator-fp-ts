import { ConfirmQuestion } from "inquirer";
import { GeneratorModule } from "../generator.module";
import { Conformation, Dependencies } from "../../types";

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
 * @class VSCodeModule
 * @extends {GeneratorModule<Props>}
 */
export class VSCodeModule extends GeneratorModule<Props> {
    /**
     * Initializes the module props.
     *
     * @protected
     * @returns {Props} Initialized props
     * @memberof VSCodeModule
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
     * @memberof VSCodeModule
     */
    public async prompt(): Promise<void> {
        const question: ConfirmQuestion = {
            type: "confirm",
            name: "confirmed",
            message: "Would you like to add pre-configured VS Code settings?",
            default: true,
        };

        const answer = await this.generator.prompt<Conformation>(question);
        this.props.enabled = answer.confirmed;
    }

    /**
     * Will be called in the configuration phase.
     *
     * @returns {void}
     * @memberof VSCodeModule
     */
    public configure(): void {
        // Nothing to configure here.
    }

    /**
     * Will be called in the writing phase.
     *
     * @memberof VSCodeModule
     */
    public write(): void {
        if (!this.props.enabled) return;

        this.generator.fs.copy(
            this.generator.templatePath(".vscode/**/*"),
            `${this.root}/.vscode`
        );
    }

    /**
     * Will be called in the install phase.
     *
     * @memberof VSCodeModule
     */
    public install(): Dependencies {
        return {
            dev: [],
            prod: [],
        };
    }
}
