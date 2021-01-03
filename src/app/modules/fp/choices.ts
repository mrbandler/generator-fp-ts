import Choice from "inquirer/lib/objects/choice";

/** Possible library choices. */
export const libraries: Choice[] = [
    {
        name:
            "fp-ts-contrib - A community driven utility package for fp-ts | https://github.com/gcanti/fp-ts-contrib",
        value: "fp-ts-contrib",
        short: "fp-ts-contrib",
        disabled: false,
        checked: true,
    },
    {
        name:
            "io-ts - TypeScript compatible runtime type system for IO validation | https://github.com/gcanti/io-ts",
        value: "io-ts",
        short: "io-ts",
        disabled: false,
        checked: true,
    },
    {
        name:
            "monocle-ts - Functional optics: a (partial) porting of scala monocle to TypeScript | https://github.com/gcanti/monocle-ts",
        value: "monocle-ts",
        short: "monocle-ts",
        disabled: false,
        checked: true,
    },
    {
        name:
            "newtype-ts - Implementation of newtypes in TypeScript | https://github.com/gcanti/newtype-ts",
        value: "newtype-ts",
        short: "newtype-ts",
        disabled: false,
        checked: true,
    },
    {
        name:
            "logging-ts - Composable loggers for TypeScript | https://github.com/gcanti/logging-ts",
        value: "logging-ts",
        short: "logging-ts",
        disabled: false,
        checked: true,
    },
    {
        name:
            "fp-ts-codegen - TypeScript code generation from a haskell-like syntax for ADT | https://github.com/gcanti/fp-ts-codegen",
        value: "fp-ts-codegen",
        short: "fp-ts-codegen",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-ts-routing - A type-safe bidirectional routing library for TypeScript | https://github.com/gcanti/fp-ts-routing",
        value: "fp-ts-routing",
        short: "fp-ts-routing",
        disabled: false,
        checked: false,
    },
    {
        name:
            "parser-ts - String parser combinators for TypeScript | https://github.com/gcanti/parser-ts",
        value: "parser-ts",
        short: "parser-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "remote-data-ts - RemoteData type | https://github.com/devexperts/remote-data-ts",
        value: "remote-data-ts",
        short: "remote-data-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "retry-ts - Retry combinators for monadic actions that may fail | https://github.com/gcanti/retry-ts",
        value: "retry-ts",
        short: "retry-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-ts-local-storage - fp-ts bindings for LocalStorage | https://github.com/gcanti/fp-ts-local-storage",
        value: "fp-ts-local-storage",
        short: "fp-ts-local-storage",
        disabled: false,
        checked: false,
    },
    {
        name:
            "circuit-breaker-monad - Circuit Breaker pattern as a monad | https://github.com/YBogomolov/circuit-breaker-monad",
        value: "circuit-breaker-monad",
        short: "circuit-breaker-monad",
        disabled: false,
        checked: false,
    },
    {
        name:
            "waveguide - Bifunctor effect type and concurrent data structures | https://github.com/rzeigler/waveguide",
        value: "waveguide",
        short: "waveguide",
        disabled: false,
        checked: false,
    },
    {
        name:
            "kleisli-ts - Kleisli arrows for bifunctor MonadThrow (IOEither, TaskEither) | https://github.com/YBogomolov/kleisli-ts",
        value: "kleisli-ts",
        short: "kleisli-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "@nll/datum - Datum and DatumEither types, another take on RemoteData and flow | https://github.com/nullpub/datum",
        value: "@nll/datum",
        short: "@nll/datum",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fetcher-ts - Type-safe REST HTTP client with io-ts response validation | https://github.com/YBogomolov/fetcher-ts",
        value: "fetcher-ts",
        short: "fetcher-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "alga-ts – Algebraic encoding for graphs, which makes invalid graphs unrepresentable | https://github.com/algebraic-graphs/typescript",
        value: "alga-ts",
        short: "alga-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "matechs-effect – Contravariant trifunctor effect with useful integrations (http, react, orm, cqrs, etc.) | https://github.com/Matechs-Garage/effect-ts",
        value: "matechs-effect",
        short: "matechs-effect",
        disabled: false,
        checked: false,
    },
    {
        name:
            "morphic-ts - Code first Domain modeling with extensive pattern supports (matchers, predicates, lenses) with useful, extensible, customisable derivations (Show, Eq, io-ts, fast-check, jsonSchema, etc.) | https://github.com/sledorze/morphic-ts",
        value: "morphic-ts",
        short: "morphic-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "graphics-ts - A porting of purescript-{canvas, drawing} featuring fp-ts | https://github.com/gcanti/graphics-ts",
        value: "graphics-ts",
        short: "graphics-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "expressive-ts - Comonadic builders for writing complex regular expressions | https://github.com/IMax153/expressive-ts",
        value: "expressive-ts",
        short: "expressive-ts",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-fetch - Functional style, non-throwing utils for data fetching | https://github.com/monstasat/fp-fetch",
        value: "fp-fetch",
        short: "fp-fetch",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-ts-std - The missing pseudo-standard library for fp-ts | https://github.com/samhh/fp-ts-std",
        value: "fp-ts-std",
        short: "fp-ts-std",
        disabled: false,
        checked: false,
    },
];

/** Possible bindings choices. */
export const bindings: Choice[] = [
    {
        name:
            "fp-ts-rxjs - fp-ts bindings for RxJS | https://github.com/gcanti/fp-ts-rxjs",
        value: "fp-ts-rxjs",
        short: "fp-ts-rxjs",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-ts-fluture - fp-ts bindings for Fluture | https://github.com/gcanti/fp-ts-fluture",
        value: "fp-ts-fluture",
        short: "fp-ts-fluture",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-ts-most - fp-ts bindings for @most/core | https://github.com/joshburgess/fp-ts-most",
        value: "fp-ts-most",
        short: "fp-ts-most",
        disabled: false,
        checked: false,
    },
    {
        name:
            "fp-ts-ixjs - fp-ts bindings for IxJS | https://github.com/werk85/fp-ts-ixjs",
        value: "fp-ts-ixjs",
        short: "fp-ts-ixjs",
        disabled: false,
        checked: false,
    },
];
