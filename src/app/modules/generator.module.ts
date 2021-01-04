import Generator from "yeoman-generator";

/**
 * Abstract generator module.
 *
 * @export
 * @abstract
 * @class GeneratorModule
 * @template P Type of the generator module properties.
 */
export abstract class GeneratorModule<P = unknown> {
    /**
     * Generator the module belongs to.
     *
     * @protected
     * @type {Generator}
     * @memberof GeneratorModule
     */
    protected generator: Generator;

    /**
     * Root path of the project to create.
     *
     * @protected
     * @type {string}
     * @memberof GeneratorModule
     */
    protected root: string;

    /**
     * Properties of the module.
     *
     * NOTE: Need to be set by the module implementer at the end of the prompt method.
     *
     * @protected
     * @type {P}
     * @memberof GeneratorModule
     */
    protected props!: P;

    /**
     * Default constructor.
     * @param {Generator} generator Generator the module belongs to
     * @memberof GeneratorModule
     */
    constructor(generator: Generator) {
        this.generator = generator;
        this.root = generator.destinationRoot();
        this.props = this.initProps();
    }

    /**
     * Used to initialize the module properties from the specfic implementer.
     *
     * @protected
     * @abstract
     * @returns {P} Initialized props
     * @memberof GeneratorModule
     */
    protected abstract initProps(): P;

    /**
     * Will be called to prompt the user for information.
     *
     * @abstract
     * @returns {Promise<void>}
     * @memberof GeneratorModule
     */
    public abstract prompt(): Promise<void>;

    /**
     * Will be called in the configuration phase.
     *
     * @abstract
     * @memberof GeneratorModule
     */
    public abstract configure(): void;

    /**
     * Will be called in the write phase.
     *
     * @abstract
     * @memberof GeneratorModule
     */
    public abstract write(): void;

    /**
     * Will be called in the install phase.
     *
     * @abstract
     * @memberof GeneratorModule
     */
    public abstract install(): void;
}
