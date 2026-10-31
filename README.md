# OrbitDesk — Client Workspace

OrbitDesk is a client and project management workspace built with React. It helps freelancers and independent developers organize projects, track deliverables, manage priorities, and monitor their work from one place.

## Features

- **Workspace Session:** Enter your name and email to access a personalized workspace.
- **Project Management:** Create and organize client projects with deadlines.
- **Deliverable Tracking:** Add deliverables, set priorities, and update their status.
- **Activity History:** Track important workspace actions.
- **Global Theme Management:** Switch between light and dark themes.
- **Persistent Workspace:** Save workspace data and preferences in the browser.
- **Responsive Interface:** Designed for desktop and mobile screens.

## Tech Stack

- React
- Vite
- JavaScript
- React Context API
- useReducer
- React Hooks
- CSS
- Lucide React
- localStorage

## Context API Implementation

React Context API is used to share application state across components without prop drilling.

The global state manages:

- User session
- Projects
- Deliverables
- Activity history
- Application theme

The useReducer hook manages state transitions, while useContext provides access to shared state.

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   └── ui/
├── context/
├── hooks/
├── pages/
├── reducers/
├── styles/
├── utils/
├── App.jsx
└── main.jsx```

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

```bash
git clone https://github.com/abdul-moiz1687/orbitdesk-client-workspace.git
cd orbitdesk-client-workspace
npm install
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| npm run dev | Start development server |
| npm run build | Production build |
| npm run lint | Check code quality |

## Session and Storage

OrbitDesk uses a mock user session. Workspace data is stored locally in the browser using localStorage. Each email has a separate workspace on the same browser.

This project does not include real authentication, a backend, or cloud synchronization.

## Internship Assignment

Built as part of the Barakah TechLabs MERN Stack Engineer internship assignment to demonstrate React Context API and global state management.

Built with React.
