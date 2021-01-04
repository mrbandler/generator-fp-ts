import _ from "lodash";
import Generator from "yeoman-generator";
import yosay from "yosay";
import chalk from "chalk";
import { GeneratorModule } from "./modules/generator.module";
import { FPModule } from "./modules/fp/fp.module";
import { LintingModule } from "./modules/linting/linting.module";
import { VSCodeModule } from "./modules/vscode/vscode.module";
import { TestModule } from "./modules/test/test.module";

/**
 * fp-ts generator implementation.
 *
 * @export
 * @class Gen
 * @extends {Generator}
 */
export default class FPTSGenerator extends Generator {
    /**
     * List of all generator modules.
     *
     * @private
     * @type {GeneratorModule[]}
     * @memberof FPTSGenerator
     */
    private modules: GeneratorModule[] = [];

    /**
     * Will be called on generator initialization.
     *
     * @memberof FPTSGenerator
     */
    public initializing(): void {
        this.modules.push(
            ...[
                new FPModule(this),
                new LintingModule(this),
                new VSCodeModule(this),
                new TestModule(this),
            ]
        );
    }

    /**
     * Will be valled on generator prompting.
     *
     * @returns {Promise<void>}
     * @memberof FPTSGenerator
     */
    public async prompting(): Promise<void> {
        const greeting = yosay(
            `Welcome to the world of ${chalk.red("PURE")} bliss!`
        );
        this.log(greeting);

        for (const module of this.modules) await module.prompt();
    }

    /**
     * Will be called on generator configuration.
     *
     * @memberof FPTSGenerator
     */
    public async configuring(): Promise<void> {
        this.fs.copy(
            this.templatePath("package.json"),
            this.destinationPath("package.json")
        );

        this.fs.extendJSON(this.destinationPath("package.json"), {
            name: `${_.last(this.destinationRoot().split("/"))}`,
            main: "./dist/index.js",
            scripts: {
                start: "node ./dist/index.js",
                build: "tsc",
                "build:start": "yarn build && yarn start",
            },
        });

        for (const module of this.modules) module.configure();
    }

    /**
     * Will be called on generator writing.
     *
     * @memberof FPTSGenerator
     */
    public writing(): void {
        for (const module of this.modules) module.write();
    }

    /**
     * Will be called on generator install.
     *
     * @memberof FPTSGenerator
     */
    public install(): void {
        const deps = this.modules
            .map(m => m.install())
            .reduce(
                (result, current) => {
                    result.dev.push(...current.dev);
                    result.prod.push(...current.prod);

                    return result;
                },
                {
                    dev: [],
                    prod: [],
                }
            );

        this.yarnInstall(deps.prod);
        this.yarnInstall(deps.dev, { dev: true });
    }

    /**
     * Will be called on generator end.
     *
     * @memberof FPTSGenerator
     */
    public end(): void {
        // Nothing to end here.
    }
}
