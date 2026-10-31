import { Activity, Briefcase, CalendarCheck, LayoutDashboard, LogOut, Orbit, Settings, X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useWorkspace } from '../../hooks/useWorkspace';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'deliverables', label: 'Deliverables', icon: CalendarCheck },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ page, onNavigate, user, onLogout, mobileOpen, onClose }) {
  const { deliverables } = useWorkspace();
  const openCount = deliverables.filter((item) => item.status !== 'Done').length;

  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={onClose} />}
      <aside id="workspace-sidebar" className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`} aria-label="Workspace sidebar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Orbit size={21} strokeWidth={2.3} /></div>
          <div><span className="brand-name">orbitdesk</span><span className="brand-caption">CLIENT WORKSPACE</span></div>
          <button className="sidebar-close" type="button" onClick={onClose} aria-label="Close navigation"><X size={18} aria-hidden="true" /></button>
        </div>

        <div className="workspace-switcher" aria-label={`${user.name}'s workspace`}>
          <span className="workspace-avatar" aria-hidden="true">{user.name.trim().charAt(0).toUpperCase()}</span>
          <span className="workspace-copy"><strong>{user.name}'s workspace</strong><small>{user.email}</small></span>
          <span className="workspace-dot" aria-hidden="true" />
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${page === id ? 'active' : ''}`}
              type="button"
              aria-current={page === id ? 'page' : undefined}
              onClick={() => { onNavigate(id); onClose(); }}
            >
              <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
              {id === 'deliverables' && <span className="nav-count" aria-label={`${openCount} open deliverables`}>{openCount}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon" aria-hidden="true"><Orbit size={16} /></div>
            <strong>Keep work moving</strong>
            <p>Small, clear deliverables make big projects easier to ship.</p>
          </div>
          <div className="sidebar-user">
            <Avatar name={user.name} />
            <div className="sidebar-user-copy"><strong>{user.name}</strong><small>{user.email}</small></div>
            <button className="logout-icon" type="button" onClick={onLogout} title="Switch workspace" aria-label="Sign out and switch workspace"><LogOut size={17} /></button>
          </div>
        </div>
      </aside>
    </>
  );
}
