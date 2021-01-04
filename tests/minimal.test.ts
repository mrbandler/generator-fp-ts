import * as path from "path";
import * as assert from "yeoman-assert";
import * as test from "yeoman-test";

describe("generator-noop:app", () => {
    beforeAll(() => {
        return helpers
            .run(path.join(__dirname, "../generators/app"))
            .withPrompts({ someAnswer: true });
    });

    it("creates files", () => {
        assert.file(["dummyfile.txt"]);
    });
});
