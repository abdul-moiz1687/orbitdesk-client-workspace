import { Activity, CheckCircle2, Clock, LogIn, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import { relativeTime } from '../utils/format';

const ICONS = { done: CheckCircle2, review: Clock, login: LogIn, created: PlusCircle, updated: Pencil, deleted: Trash2, note: Activity };

export default function ActivityPage() {
  const { activity } = useWorkspace();
  return (
    <div className="page-stack">
      <div className="page-intro-row"><div><h2>The work trail</h2><p>See what's changed across your projects and deliverables.</p></div><span className="activity-count"><Activity size={15} aria-hidden="true" /> {activity.length} recent events</span></div>
      <section className="content-card activity-page-card" aria-labelledby="activity-heading">
        <div className="section-heading"><div><span className="section-kicker">WORKSPACE HISTORY</span><h3 id="activity-heading">Recent activity</h3></div><span className="live-indicator"><i aria-hidden="true" /> SAVED TO THIS WORKSPACE</span></div>
        {activity.length ? (
          <div className="activity-timeline" aria-live="polite">
            {activity.map((entry) => {
              const Icon = ICONS[entry.kind] || Activity;
              return <article className="timeline-entry" key={entry.id}><div className={`timeline-icon timeline-${entry.kind}`} aria-hidden="true"><Icon size={17} /></div><div className="timeline-copy"><strong>{entry.title}</strong><p>{entry.detail}</p></div><time dateTime={new Date(entry.at).toISOString()}>{relativeTime(entry.at)}</time></article>;
            })}
          </div>
        ) : (
          <div className="empty-state"><div className="empty-state-icon"><Activity size={22} aria-hidden="true" /></div><h3>No activity yet</h3><p>Create a project or add a deliverable. Your workspace changes will show up here.</p></div>
        )}
      </section>
    </div>
  );
}
