# 0001. Subtraction is a new exported function `sub(a, b)` in its own module, `src/sub.js`

- Status: Proposed
- Implemented: no
- Date: 2026-10-18
- Decided by: pending, the owner accepts or rejects this record
- Use cases: UC-1

## Context

The library today has one function, `add(a, b)`, in `src/add.js`. It returns the sum of two numbers, and callers import
it with `require`. Issue #1 asks for the library to subtract as well: `sub(5, 3)` should give `2`. Use case UC-1 says
the function lives in `src/sub.js`, and that the change is done when a test shows `sub(5, 3)` is `2` and the gate
passes.

A new exported function is a new public interface: callers will import it by name. The process requires a decision
record for each such change, so this record comes before any test or code.

A module is one file that exports functions, and `require` loads it. Putting each operation in its own file keeps
the files small, but a caller then needs one more `require` line for each operation.

## Question

Where does `sub` live, and what is its exact behaviour: in a new file `src/sub.js`, or added to `src/add.js`?

## Options

| # | Option | Cost |
|---|---|---|
| 1 | New file `src/sub.js` that exports `sub(a, b)` as `a - b`, as UC-1 names it. Callers `require('./src/sub.js')`. | One new file and one new test file. Nothing existing changes. Callers need a second `require` to use both. |
| 2 | Add `sub` to `src/add.js`, next to `add`. | Smallest change. Departs from UC-1, which names `src/sub.js`, so UC-1 would need editing first. Mixes two operations in one file. |

## Decision

**Chosen: option 1.** Option 2 is rejected because UC-1, which the owner accepted, names `src/sub.js`, and changing the
file layout would mean changing the accepted use case.

In short: add `src/sub.js`, which exports `sub(a, b)` returning `a - b`, and leave `src/add.js` unchanged.

## Consequences

- `sub` becomes part of the public interface. Its behaviour is `a - b` for numbers: `sub(5, 3)` is `2`.
- Later operations (multiplication, division) would follow the same pattern: one file per operation. A later record
  would decide whether that pattern holds.
- Still open: whether `sub` should check that its arguments are numbers. This record does not decide it; the current
  `add` does not check either.

## Implementation

Done: nothing yet.

Left:

- Add `src/sub.js` with `sub(a, b)` and a test for `sub(5, 3)` that names this record (plan step 1).
