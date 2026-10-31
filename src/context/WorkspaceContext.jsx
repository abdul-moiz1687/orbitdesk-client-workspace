import { useEffect, useMemo, useReducer } from 'react';
import WorkspaceContext from './workspace-context';
import { createInitialState, workspaceReducer } from '../reducers/workspaceReducer';
import {
  SESSION_STORAGE_KEY,
  THEME_STORAGE_KEY,
  accountStorageKey,
  readStoredValue,
  removeStoredValue,
  writeStoredValue,
} from '../utils/workspaceStorage';

function makeEvent(kind, title, detail) {
  return {
    id: `activity-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    kind,
    title,
    detail,
    at: Date.now(),
  };
}

function getInitials(name) {
  return String(name || 'User')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(workspaceReducer, undefined, createInitialState);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    writeStoredValue(THEME_STORAGE_KEY, state.theme);

    if (state.user) {
      writeStoredValue(SESSION_STORAGE_KEY, { user: state.user });
      writeStoredValue(accountStorageKey(state.user.email), {
        user: state.user,
        theme: state.theme,
        projects: state.projects,
        deliverables: state.deliverables,
        activity: state.activity,
      });
    } else {
      removeStoredValue(SESSION_STORAGE_KEY);
    }
  }, [state]);

  const value = useMemo(() => ({
    ...state,
    setTheme: (theme) => dispatch({ type: 'SET_THEME', theme }),
    login: (name, email) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const cleanName = String(name || '').trim();
      const savedWorkspace = readStoredValue(accountStorageKey(normalizedEmail), null);
      const user = {
        id: normalizedEmail,
        name: cleanName,
        email: normalizedEmail,
        initials: getInitials(cleanName),
      };
      const theme = savedWorkspace?.theme === 'dark'
        ? 'dark'
        : savedWorkspace?.theme === 'light'
          ? 'light'
          : readStoredValue(THEME_STORAGE_KEY, 'light') === 'dark' ? 'dark' : 'light';

      dispatch({
        type: 'LOGIN',
        user,
        workspace: savedWorkspace,
        theme,
        event: makeEvent('login', 'Workspace opened', 'You are ready to pick up where you left off.'),
      });
    },
    logout: () => dispatch({ type: 'LOGOUT' }),
    addProject: (project) => dispatch({
      type: 'ADD_PROJECT',
      project,
      event: makeEvent('created', `Project created: ${project.name}`, project.client),
    }),
    addDeliverable: (deliverable) => {
      const project = state.projects.find((entry) => entry.id === deliverable.projectId);
      dispatch({
        type: 'ADD_DELIVERABLE',
        deliverable,
        event: makeEvent('created', `Deliverable added: ${deliverable.title}`, project?.name || 'Workspace'),
      });
    },
    updateDeliverable: (id, status) => {
      const item = state.deliverables.find((deliverable) => deliverable.id === id);
      if (!item || item.status === status) return;
      const project = state.projects.find((entry) => entry.id === item.projectId);
      const title = status === 'Done'
        ? `Deliverable completed: ${item.title}`
        : `Deliverable moved to ${status.toLowerCase()}: ${item.title}`;
      dispatch({
        type: 'UPDATE_DELIVERABLE',
        id,
        status,
        event: makeEvent(status === 'Done' ? 'done' : 'updated', title, project?.name || 'Workspace'),
      });
    },
    deleteDeliverable: (id) => {
      const item = state.deliverables.find((deliverable) => deliverable.id === id);
      if (!item) return;
      const project = state.projects.find((entry) => entry.id === item.projectId);
      dispatch({
        type: 'DELETE_DELIVERABLE',
        id,
        event: makeEvent('deleted', `Deliverable removed: ${item.title}`, project?.name || 'Workspace'),
      });
    },
    resetData: () => dispatch({
      type: 'RESET_DATA',
      event: makeEvent('note', 'Workspace cleared', 'Projects and deliverables were removed from this workspace.'),
    }),
  }), [state]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}


