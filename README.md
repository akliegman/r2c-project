# r2c-project

In the project directory, run:

## Scope/decisions

- Built it in React as a SPA, where progress is stored in the mock DB
- Using localStorage as a mock DB
- Did not include the comments section
- Did not include the "right-click" functionality, instead focusing on having the delete and move album functionality localized to the fullscreen photo modal
- Did not include a confirmation dialog for the move/delete functionalities, which is not the best UX, but meets the functional requirements of the project
- Contributed lightweight out-of-the-box testing, but would expand and better this with more time
- Worked with vanilla css, would reconsider this option with more time
- `TODO`s are listed throughout the codebase for logical next steps in the app's development

## Instructions

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
