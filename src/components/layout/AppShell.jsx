import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ page, onNavigate, user, onLogout, onCreate, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const menuButton = menuButtonRef.current;
    if (!mobileOpen) return undefined;

    const sidebar = document.getElementById('workspace-sidebar');
    const focusable = sidebar?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      menuButton?.focus();
    };
  }, [mobileOpen]);

  return (
    <div className="app-shell">
      <a className="skip-link app-skip-link" href="#main-content">Skip to main content</a>
      <Sidebar
        page={page}
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="main-area">
        <Topbar
          page={page}
          user={user}
          onMenu={() => setMobileOpen((open) => !open)}
          menuButtonRef={menuButtonRef}
          mobileOpen={mobileOpen}
          onCreate={onCreate}
        />
        <main className="page-content" id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="app-footer">
          <span>OrbitDesk</span>
          <span>Make good work, keep it moving.</span>
          <span>Your workspace Â· Saved in this browser</span>
        </footer>
      </div>
    </div>
  );
}
