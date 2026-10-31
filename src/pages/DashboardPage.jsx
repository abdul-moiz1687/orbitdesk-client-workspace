import { ArrowRight, ArrowUpRight, Briefcase, CalendarDays, CheckCircle2, Circle, Clock, Plus, Sparkles } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import { formatDate, greeting, isOverdue } from '../utils/format';

function progressFor(projectId, deliverables) {
  const items = deliverables.filter((item) => item.projectId === projectId);
  if (!items.length) return 0;
  return Math.round((items.filter((item) => item.status === 'Done').length / items.length) * 100);
}

export default function DashboardPage({ onNavigate, onCreate }) {
  const { user, projects, deliverables, activity, updateDeliverable } = useWorkspace();
  const doneCount = deliverables.filter((item) => item.status === 'Done').length;
  const openCount = deliverables.filter((item) => item.status !== 'Done').length;
  const overdue = deliverables.filter((item) => isOverdue(item.dueDate, item.status));
  const dueSoon = deliverables
    .filter((item) => item.status !== 'Done' && !isOverdue(item.dueDate, item.status))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);
  const activeProjects = projects.filter((project) => project.status !== 'Completed');
  const projectLookup = Object.fromEntries(projects.map((project) => [project.id, project]));
  const completionRate = deliverables.length ? Math.round((doneCount / deliverables.length) * 100) : 0;

  return (
    <div className="page-stack">
      <section className="welcome-banner" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <div className="welcome-kicker"><Sparkles size={14} aria-hidden="true" /> YOUR WORKSPACE</div>
          <h2 id="welcome-title">{greeting()}, {user.name}.</h2>
          <p>Here's the shape of your work today. Keep your focus on the next useful step.</p>
          <button className="welcome-action" type="button" onClick={() => onNavigate('deliverables')}>View deliverables <ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>
        <div className="welcome-visual" aria-hidden="true"><div className="visual-ring ring-a" /><div className="visual-ring ring-b" /><div className="visual-core"><Briefcase size={27} /></div><span className="visual-spark spark-a">✦</span><span className="visual-spark spark-b">✧</span></div>
        <div className="welcome-stamp"><span>WORKSPACE</span><strong><i /> READY WHEN YOU ARE</strong></div>
      </section>

      <section className="metric-grid" aria-label="Workspace summary">
        <article className="metric-card"><div className="metric-top"><span>Active projects</span><span className="metric-icon violet" aria-hidden="true"><Briefcase size={18} /></span></div><strong className="metric-number">{activeProjects.length.toString().padStart(2, '0')}</strong><span className="metric-foot">Across your client list</span></article>
        <article className="metric-card"><div className="metric-top"><span>Open deliverables</span><span className="metric-icon blue" aria-hidden="true"><Circle size={18} /></span></div><strong className="metric-number">{openCount.toString().padStart(2, '0')}</strong><span className="metric-foot">Items still in progress</span></article>
        <article className="metric-card"><div className="metric-top"><span>Completed</span><span className="metric-icon green" aria-hidden="true"><CheckCircle2 size={18} /></span></div><strong className="metric-number">{doneCount.toString().padStart(2, '0')}</strong><span className="metric-foot">Deliverables shipped</span></article>
        <article className="metric-card"><div className="metric-top"><span>Needs attention</span><span className="metric-icon orange" aria-hidden="true"><CalendarDays size={18} /></span></div><strong className="metric-number">{overdue.length.toString().padStart(2, '0')}</strong><span className="metric-foot">Past due and not finished</span></article>
      </section>

      <div className="dashboard-columns">
        <section className="content-card projects-overview" aria-labelledby="projects-in-motion-heading">
          <div className="section-heading"><div><span className="section-kicker">CLIENT WORK</span><h3 id="projects-in-motion-heading">Projects in motion</h3></div><button className="text-action" type="button" onClick={() => onNavigate('projects')}>All projects <ArrowRight size={15} aria-hidden="true" /></button></div>
          <div className="project-list">
            {activeProjects.slice(0, 4).map((project) => {
              const progress = progressFor(project.id, deliverables);
              const count = deliverables.filter((item) => item.projectId === project.id).length;
              return (
                <article className="project-row" key={project.id}>
                  <div className={`project-monogram ${project.accent}`} aria-hidden="true">{project.client.slice(0, 1).toUpperCase()}</div>
                  <div className="project-main"><div className="project-name-line"><strong>{project.name}</strong><span className={`status-pill status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</span></div><span className="project-client">{project.client} <i>·</i> {project.type}</span><div className="progress-line"><span role="progressbar" aria-label={`${project.name} progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><i style={{ width: `${progress}%` }} /></span><small>{progress}%</small></div></div>
                  <div className="project-due"><span>DEADLINE</span><strong>{formatDate(project.dueDate, { day: 'numeric', month: 'short' })}</strong><small>{count} deliverables</small></div>
                </article>
              );
            })}
            {activeProjects.length === 0 && <div className="empty-inline empty-project-prompt"><strong>No projects yet</strong><span>Create a client project to start organising your work.</span></div>}
          </div>
          <button className="add-inline" type="button" onClick={() => onCreate('project')}><Plus size={16} aria-hidden="true" /> Add a client project</button>
        </section>

        <section className="content-card due-overview" aria-labelledby="coming-due-heading">
          <div className="section-heading"><div><span className="section-kicker">UP NEXT</span><h3 id="coming-due-heading">Coming due</h3></div><button className="round-link" type="button" onClick={() => onNavigate('deliverables')} aria-label="View all deliverables"><ArrowUpRight size={17} aria-hidden="true" /></button></div>
          {overdue.length > 0 && <div className="attention-note"><Clock size={15} aria-hidden="true" /><span><strong>{overdue.length} overdue</strong> {overdue.length === 1 ? 'item needs' : 'items need'} a new plan.</span></div>}
          <div className="due-list">
            {dueSoon.map((item) => <div className="due-item" key={item.id}><button className="due-check" type="button" onClick={() => updateDeliverable(item.id, 'Done')} aria-label={`Mark ${item.title} complete`}><Circle size={17} aria-hidden="true" /></button><div className="due-copy"><strong>{item.title}</strong><span>{projectLookup[item.projectId]?.client || 'Unassigned project'}</span></div><span className="due-date">{formatDate(item.dueDate)}</span></div>)}
            {dueSoon.length === 0 && <div className="empty-inline">{deliverables.length ? 'Nothing due soon. Nice work.' : 'Your upcoming deadlines will appear here after you add deliverables.'}</div>}
          </div>
          <button className="add-inline" type="button" onClick={() => onCreate(projects.length ? 'deliverable' : 'project')}><Plus size={16} aria-hidden="true" /> {projects.length ? 'Add a deliverable' : 'Create a project first'}</button>
        </section>
      </div>

      <div className="dashboard-bottom-grid">
        <section className="content-card progress-card" aria-labelledby="workspace-progress-heading"><div className="section-heading"><div><span className="section-kicker">MOMENTUM</span><h3 id="workspace-progress-heading">Workspace progress</h3></div><span className="progress-period">ALL DELIVERABLES</span></div><div className="momentum-content"><div className="progress-donut" style={{ '--progress': `${completionRate}%` }} role="img" aria-label={`${completionRate}% of deliverables completed`}><div><strong>{completionRate}%</strong><span>complete</span></div></div><div className="momentum-copy"><strong>{doneCount} of {deliverables.length} deliverables shipped</strong><p>Progress is based on items marked as done across all client projects.</p><div className="legend-line"><span><i className="legend-done" /> Completed</span><span><i className="legend-open" /> Still open</span></div></div></div></section>
        <section className="content-card activity-preview" aria-labelledby="recent-activity-heading"><div className="section-heading"><div><span className="section-kicker">RECENT CHANGES</span><h3 id="recent-activity-heading">Activity</h3></div><button className="text-action" type="button" onClick={() => onNavigate('activity')}>View history <ArrowRight size={15} aria-hidden="true" /></button></div><div className="activity-mini-list">{activity.slice(0, 3).map((entry) => <div className="activity-mini" key={entry.id}><span className={`activity-dot dot-${entry.kind}`} aria-hidden="true" /> <div><strong>{entry.title}</strong><small>{entry.detail}</small></div></div>)}{activity.length === 0 && <div className="empty-inline">Your recent workspace updates will appear here.</div>}</div></section>
      </div>
    </div>
  );
}
