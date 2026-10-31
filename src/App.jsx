import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import DeliverableModal from './components/ui/DeliverableModal';
import ProjectModal from './components/ui/ProjectModal';
import { useWorkspace } from './hooks/useWorkspace';
import ActivityPage from './pages/ActivityPage';
import DashboardPage from './pages/DashboardPage';
import DeliverablesPage from './pages/DeliverablesPage';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { user, logout } = useWorkspace();

  if (!user) return <LoginPage />;

  // Mount a fresh page/modal state for each signed-in workspace.
  // This avoids resetting component state from inside an effect.
  return <WorkspaceApp key={user.id} user={user} onLogout={logout} />;
}

function WorkspaceApp({ user, onLogout }) {
  const [page, setPage] = useState('dashboard');
  const [modal, setModal] = useState(null);

  const create = (kind) => setModal(kind === 'project' ? 'project' : 'deliverable');
  let content;

  switch (page) {
    case 'projects':
      content = <ProjectsPage onCreate={create} />;
      break;
    case 'deliverables':
      content = <DeliverablesPage onCreate={create} onNavigate={setPage} />;
      break;
    case 'activity':
      content = <ActivityPage />;
      break;
    case 'settings':
      content = <SettingsPage onLogout={onLogout} />;
      break;
    default:
      content = <DashboardPage onNavigate={setPage} onCreate={create} />;
  }

  return (
    <>
      <AppShell
        page={page}
        onNavigate={setPage}
        user={user}
        onLogout={onLogout}
        onCreate={create}
      >
        {content}
      </AppShell>
      {modal === 'project' && <ProjectModal onClose={() => setModal(null)} />}
      {modal === 'deliverable' && <DeliverableModal onClose={() => setModal(null)} />}
    </>
  );
}
