# OrbitDesk — Client Workspace

OrbitDesk is a responsive workspace for independent professionals who manage work for multiple clients. A user can organise client projects, break work into deliverables, track due dates, update statuses and review an activity trail.

This build is designed for the Barakah TechLabs React Context API assignment. It demonstrates a mock user session and global state without pretending that a frontend-only prototype is a production authentication system.

## What a user can do

- Enter a name and email to create a workspace or reopen the workspace associated with that email in the same browser.
- Keep client projects separate, with project type, client, due date, status and short brief.
- Add deliverables to projects, set priorities and deadlines, update status, search/filter items and remove them.
- Review project progress, upcoming deadlines, overdue work and workspace activity.
- Switch between light and dark themes; the preference is saved with the workspace.
- Sign out and open another email-based workspace. Each email has its own local project, deliverable and activity data.

## React Context API implementation

`WorkspaceContext` exposes the signed-in user, theme, projects, deliverables and activity to the component tree. `useReducer` centralises state transitions such as login, logout, theme changes, creating projects and updating deliverables. `useEffect` persists the active workspace to browser storage.

Key files:

- `src/context/WorkspaceContext.jsx` — provider and Context API actions.
- `src/reducers/workspaceReducer.js` — initial state and reducer logic.
- `src/hooks/useWorkspace.js` — safe reusable hook for reading the context.
- `src/utils/workspaceStorage.js` — browser storage helpers and per-email workspace keys.
- `src/pages/LoginPage.jsx` — user details form for opening a workspace.

## Accessibility and responsive behaviour

- Semantic page landmarks and a skip-to-content link.
- Explicit labels for form fields and accessible names for icon-only controls.
- Keyboard-visible focus styles, Escape-to-close behaviour and focus trapping/restoration for dialogs.
- Status filters expose pressed states; progress indicators expose accessible values.
- Larger control targets, readable text sizing, responsive layouts and reduced-motion support.

## Important prototype boundary

The sign-in is intentionally a **mock session** to demonstrate the assignment requirement. No password is verified, no identity provider is connected, and no backend or database is used. Workspaces are separated by email address and saved only in the current browser's `localStorage`; this is not secure account isolation and does not sync between devices or browsers. Do not enter confidential client data. A production product would need real authentication, server-side authorization and a database.

## Tech stack

React, Vite, React Context API, `useReducer`, `useEffect`, `useMemo`, `localStorage`, Lucide icons and custom responsive CSS.

## Run locally

Keep the existing Vite React `package.json`, then run:

```bash
npm install
npm install lucide-react
npm run dev
```

If `lucide-react` is already installed, the second command is unnecessary.

## Suggested reviewer walkthrough

1. Open OrbitDesk and enter one name and email address.
2. Create a client project, then add a few deliverables with different priorities and due dates.
3. Change deliverable statuses and confirm that progress and activity update.
4. Switch the theme and navigate between pages to confirm that the theme is global.
5. Sign out and enter a different email address. Confirm that the second workspace starts separately.
6. Sign out and re-enter the first email address in the same browser. Its projects and deliverables should be restored.
7. Refresh the page while signed in to confirm session and workspace persistence.
