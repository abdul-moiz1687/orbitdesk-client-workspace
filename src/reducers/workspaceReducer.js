import {
  SESSION_STORAGE_KEY,
  THEME_STORAGE_KEY,
  accountStorageKey,
  readStoredValue,
} from '../utils/workspaceStorage';

const emptyWorkspace = {
  projects: [],
  deliverables: [],
  activity: [],
};

export function createInitialState() {
  const session = readStoredValue(SESSION_STORAGE_KEY, null);
  const user = session?.user?.email
    ? {
        id: String(session.user.email).trim().toLowerCase(),
        name: String(session.user.name || 'Workspace member'),
        email: String(session.user.email).trim().toLowerCase(),
      }
    : null;
  const saved = user ? readStoredValue(accountStorageKey(user.email), null) : null;
  const storedTheme = readStoredValue(THEME_STORAGE_KEY, 'light');
  const theme = saved?.theme === 'dark' || (!saved && storedTheme === 'dark') ? 'dark' : 'light';

  return {
    theme,
    user,
    projects: Array.isArray(saved?.projects) ? saved.projects : [...emptyWorkspace.projects],
    deliverables: Array.isArray(saved?.deliverables) ? saved.deliverables : [...emptyWorkspace.deliverables],
    activity: Array.isArray(saved?.activity) ? saved.activity : [...emptyWorkspace.activity],
  };
}

function appendActivity(activity, event) {
  return event ? [event, ...activity].slice(0, 60) : activity;
}

export function workspaceReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme === 'dark' ? 'dark' : 'light' };

    case 'LOGIN':
      return {
        ...state,
        theme: action.theme,
        user: action.user,
        projects: Array.isArray(action.workspace?.projects) ? action.workspace.projects : [],
        deliverables: Array.isArray(action.workspace?.deliverables) ? action.workspace.deliverables : [],
        activity: appendActivity(
          Array.isArray(action.workspace?.activity) ? action.workspace.activity : [],
          action.event,
        ),
      };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [action.project, ...state.projects],
        activity: appendActivity(state.activity, action.event),
      };

    case 'ADD_DELIVERABLE':
      return {
        ...state,
        deliverables: [action.deliverable, ...state.deliverables],
        activity: appendActivity(state.activity, action.event),
      };

    case 'UPDATE_DELIVERABLE': {
      const deliverable = state.deliverables.find((item) => item.id === action.id);
      if (!deliverable || deliverable.status === action.status) return state;
      return {
        ...state,
        deliverables: state.deliverables.map((item) =>
          item.id === action.id ? { ...item, status: action.status } : item,
        ),
        activity: appendActivity(state.activity, action.event),
      };
    }

    case 'DELETE_DELIVERABLE':
      return {
        ...state,
        deliverables: state.deliverables.filter((item) => item.id !== action.id),
        activity: appendActivity(state.activity, action.event),
      };

    case 'RESET_DATA':
      return {
        ...state,
        ...emptyWorkspace,
        activity: appendActivity([], action.event),
      };

    default:
      return state;
  }
}
