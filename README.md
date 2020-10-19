# Intercom Take Home Test



## Install and Run

To get things up and running, first you'll need to install Node.js ~v12.X.X, then install dependencies and finally run our scripts.

1. [Install Node.js](https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz)
2. Install Dependencies: `npm install`
3. build TypeScript: `npm run build:tsc`
4. start app: `npm run start`
5. run tests: `npm run test`

## Structure

> Note: the `output.txt` file can be found in the `data/` folder as well as in the submitted zip file.
The list below gives a brief overview of how the code is structured

- `__tests__/`: contains all tests (using Jest as the test runner).
	- `data/`: sample data used to validate against tests
	- `helpers/`: helper functions
	- `**.spec.ts`: tests corresponding to the areas of code/features they test.
- data/: holds input and output files used by the program. Here you can find the `customers.txt` and `output.txt` files
- `src/`: contains all source code
	- `index.ts`: main app entry point
	- `customers.ts`: functions that handle interating with customer data
	- `typings.ts`: typings for lat/long coodinates and customer info
	- `config/`: app-wide configs e.g. `officeLocation`, Distance to send invites, and more are stored here
	- `utils/`: util functions for math and I/O operations


## Commands

A more comprehensive list of npm scripts available can be found below

| Command   | Description                                             |
|-----------|---------------------------------------------------------|
| `start`     | start app (runs transpiled javascript in `.dist/` folder) |
| `build:tsc` | transpiled js using tsconfig settings                   |
| `watch:tsc` | transpiles js in _watch_ mode for use in development    |
| `test`      | runs tests                                              |
| `format`    | format source code using prettier                       |


