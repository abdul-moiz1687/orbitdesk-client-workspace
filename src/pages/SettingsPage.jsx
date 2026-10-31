import { Database, Monitor, Moon, Palette, RotateCcw, ShieldCheck, Sun } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import { useWorkspace } from '../hooks/useWorkspace';

export default function SettingsPage({ onLogout }) {
  const { user, theme, setTheme, resetData } = useWorkspace();

  const handleReset = () => {
    const confirmed = window.confirm('Clear all projects, deliverables and activity for this workspace? This cannot be undone.');
    if (confirmed) resetData();
  };

  return (
    <div className="page-stack settings-stack">
      <div className="page-intro-row">
        <div><h2>Make it yours</h2><p>Manage your profile, appearance and workspace data.</p></div>
      </div>

      <section className="content-card settings-profile-card" aria-labelledby="profile-heading">
        <div className="settings-profile-main">
          <Avatar name={user.name} size="xl" />
          <div><span className="section-kicker">CURRENT WORKSPACE</span><h3 id="profile-heading">{user.name}</h3><p>{user.email}</p></div>
        </div>
        <div className="workspace-active-tag"><ShieldCheck size={16} aria-hidden="true" /> Workspace active</div>
      </section>

      <section className="content-card settings-section" aria-labelledby="appearance-heading">
        <div className="settings-heading">
          <div className="settings-heading-icon" aria-hidden="true"><Palette size={18} /></div>
          <div><h3 id="appearance-heading">Appearance</h3><p>Choose the workspace look that's easiest on your eyes.</p></div>
        </div>
        <div className="theme-options" role="group" aria-label="Color theme">
          <button className={`theme-option ${theme === 'light' ? 'chosen' : ''}`} type="button" onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>
            <span className="theme-preview preview-light" aria-hidden="true"><i /><i /><i /></span>
            <span><strong>Light</strong><small>Bright and clear</small></span>
            <span className="theme-radio" aria-hidden="true" />
          </button>
          <button className={`theme-option ${theme === 'dark' ? 'chosen' : ''}`} type="button" onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>
            <span className="theme-preview preview-dark" aria-hidden="true"><i /><i /><i /></span>
            <span><strong>Dark</strong><small>Comfortable in low light</small></span>
            <span className="theme-radio" aria-hidden="true" />
          </button>
        </div>
        <div className="settings-hint"><Sun size={15} aria-hidden="true" /><span>Your theme preference is saved with this workspace.</span><Moon size={15} aria-hidden="true" /></div>
      </section>

      <section className="content-card settings-section" aria-labelledby="data-heading">
        <div className="settings-heading">
          <div className="settings-heading-icon" aria-hidden="true"><Database size={18} /></div>
          <div><h3 id="data-heading">Your data and access</h3><p>Each email address has a separate workspace in this browser. Returning with the same email reopens that workspace.</p></div>
        </div>
        <div className="local-data-note">
          <Monitor size={18} aria-hidden="true" />
          <p><strong>Browser-only prototype</strong><span>This assignment simulates a user session with React Context API. It does not verify identity, use a password, or sync data to other devices. Do not store confidential client information here.</span></p>
        </div>
        <div className="settings-action-row">
          <div><strong>Clear this workspace</strong><p>Remove its projects, deliverables and activity history.</p></div>
          <button className="secondary-button" type="button" onClick={handleReset}><RotateCcw size={15} aria-hidden="true" /> Clear data</button>
        </div>
        <div className="settings-action-row">
          <div><strong>Switch workspace</strong><p>Return to the access screen and open another workspace.</p></div>
          <button className="danger-button" type="button" onClick={onLogout}>Switch workspace</button>
        </div>
      </section>

      <div className="settings-footnote"><ShieldCheck size={15} aria-hidden="true" /> A production app would add verified authentication and a server database.</div>
    </div>
  );
}
