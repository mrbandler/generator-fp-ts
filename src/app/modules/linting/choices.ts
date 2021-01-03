import Choice from "inquirer/lib/objects/choice";

/** Possible functional rulesets. */
export const rulesets: Choice[] = [
    {
        name:
            "All (plugin:functional/all) - Enables all rules defined in the plugin",
        value: "plugin:functional/all",
        short: "All",
        disabled: false,
        checked: false,
    },
    {
        name: "Recommended (plugin:functional/recommended)",
        value: "plugin:functional/recommended",
        short: "Recommended",
        disabled: false,
        checked: true,
    },
    {
        name: "Lite (plugin:functional/lite)",
        value: "plugin:functional/lite",
        short: "Lite",
        disabled: false,
        checked: false,
    },
    {
        name: "No Mutations (plugin:functional/no-mutations)",
        value: "plugin:functional/no-mutations",
        short: "No Mutations",
        disabled: false,
        checked: false,
    },
    {
        name: "No Object Orientation (plugin:functional/no-object-orientation)",
        value: "plugin:functional/no-object-orientation",
        short: "No Object Orientation",
        disabled: false,
        checked: false,
    },
    {
        name: "No Statements (plugin:functional/no-statements)",
        value: "plugin:functional/no-statements",
        short: "No Statements",
        disabled: false,
        checked: false,
    },
    {
        name: "No Exceptions (plugin:functional/no-exceptions)",
        value: "plugin:functional/no-exceptions",
        short: "No Exceptions",
        disabled: false,
        checked: false,
    },
    {
        name: "Currying (plugin:functional/currying)",
        value: "plugin:functional/currying",
        short: "Currying",
        disabled: false,
        checked: false,
    },
    {
        name: "Stylitic (plugin:functional/stylitic)",
        value: "plugin:functional/stylitic",
        short: "Stylitic",
        disabled: false,
        checked: false,
    },
];
