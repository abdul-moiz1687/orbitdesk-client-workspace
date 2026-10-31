import { Menu, Plus } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Avatar from '../ui/Avatar';
import { useWorkspace } from '../../hooks/useWorkspace';

const TITLES = {
  dashboard: ['Overview', 'Your work at a glance'],
  projects: ['Projects', 'Keep every client engagement moving'],
  deliverables: ['Deliverables', 'The next clear action for every project'],
  activity: ['Activity', 'A running history of your workspace'],
  settings: ['Settings', 'Make this workspace feel like yours'],
};

export default function Topbar({ page, user, onMenu, menuButtonRef, mobileOpen, onCreate }) {
  const { projects } = useWorkspace();
  const [title, subtitle] = TITLES[page] || TITLES.dashboard;
  const quickAddKind = projects.length ? 'deliverable' : 'project';
  const quickAddLabel = projects.length ? 'New deliverable' : 'New project';

  return (
    <header className="topbar">
      <div className="topbar-leading">
        <button ref={menuButtonRef} className="icon-button mobile-menu" type="button" onClick={onMenu} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="workspace-sidebar"><Menu size={20} aria-hidden="true" /></button>
        <div>
          <div className="eyebrow">YOUR WORKSPACE <span>/</span> {title.toUpperCase()}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="topbar-search" type="button" onClick={() => onCreate(quickAddKind)} aria-label={quickAddLabel}>
          <Plus size={16} aria-hidden="true" /><span>Quick add</span>
        </button>
        <ThemeToggle compact />
        <button className="topbar-add" type="button" onClick={() => onCreate(page === 'projects' || !projects.length ? 'project' : 'deliverable')}>
          <Plus size={17} aria-hidden="true" /><span>{page === 'projects' || !projects.length ? 'New project' : 'New deliverable'}</span>
        </button>
        <div className="topbar-profile" aria-label={`Signed in as ${user.name}`}><Avatar name={user.name} size="sm" /></div>
      </div>
    </header>
  );
}
