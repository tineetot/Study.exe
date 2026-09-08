# Study.exe

A cozy finals reviewer for a second-year BSIT-MWA student, built with React and Vite using JavaScript.

## Current scope

The initial shell includes Home, Reviewer, Practice Quiz, and Progress panels. Platform Technologies is the only subject. Other sections contain placeholders; lessons, flashcards, quizzes, and progress storage are not implemented yet.

Navigation uses React state. Reloading returns to Home. Real subjects can be added to `src/data/subjects.js` later. Future progress will be stored locally in the browser; this version has no backend or accounts.

## Local development

With the project's dependencies installed, run `npm run dev` in the project directory and open the local URL printed by Vite. Press Ctrl+C in the terminal to stop it.

On Windows PowerShell, if script execution blocks `npm`, use `npm.cmd` instead (for example, `npm.cmd run dev`).

- `npm run lint` checks JavaScript and React conventions.
- `npm run build` creates a production build in `dist`.
- `npm run preview` serves that build locally; open the URL it prints.

## Project files

- `src/main.jsx` starts React and loads global styles.
- `src/App.jsx` contains the shell, navigation state, and placeholder panels.
- `src/data/subjects.js` holds the subject list.
- `src/index.css` defines shared design tokens and basic element styles.
- `src/App.css` defines the responsive shell layout.

## Repository content

Keep private class materials, original PDFs, personal information, and answer keys out of this public repository.
