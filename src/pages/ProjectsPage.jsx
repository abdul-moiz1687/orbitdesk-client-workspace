import { ArrowUpRight, Briefcase, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import { formatDate } from '../utils/format';

function projectProgress(projectId, deliverables) {
  const items = deliverables.filter((item) => item.projectId === projectId);
  return items.length ? Math.round(items.filter((item) => item.status === 'Done').length / items.length * 100) : 0;
}

export default function ProjectsPage({ onCreate }) {
  const { projects, deliverables } = useWorkspace();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.client} ${project.type}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (filter === 'All' || project.status === filter);
  }), [projects, query, filter]);

  return (
    <div className="page-stack">
      <div className="page-intro-row">
        <div><h2>Your client engagements</h2><p>Keep scope, timelines and delivery status visible from one place.</p></div>
        <button className="primary-button" type="button" onClick={() => onCreate('project')}><Plus size={17} aria-hidden="true" /> New project</button>
      </div>

      <div className="list-toolbar">
        <label className="search-field" htmlFor="project-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search projects</span><input id="project-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or clients..." /></label>
        <div className="filter-tabs" role="group" aria-label="Filter projects by status">
          {['All', 'Planning', 'In progress', 'In review', 'Completed'].map((item) => (
            <button key={item} className={filter === item ? 'selected' : ''} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="projects-grid">
          {filtered.map((project) => {
            const items = deliverables.filter((item) => item.projectId === project.id);
            const progress = projectProgress(project.id, deliverables);
            return (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <div className={`project-monogram project-monogram-lg ${project.accent}`} aria-hidden="true">{project.client.slice(0, 1).toUpperCase()}</div>
                  <span className={`status-pill status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</span>
                </div>
                <span className="project-type">{project.type.toUpperCase()}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="client-label">CLIENT <strong>{project.client}</strong></div>
                <div className="project-card-progress">
                  <div className="progress-label"><span>Delivery progress</span><strong>{progress}%</strong></div>
                  <div className="progress-track" role="progressbar" aria-label={`${project.name} delivery progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><i style={{ width: `${progress}%` }} /></div>
                </div>
                <div className="project-card-bottom"><span><Briefcase size={14} aria-hidden="true" /> {items.length} deliverables</span><span>Due {formatDate(project.dueDate)}</span></div>
                <div className="project-card-link"><span>PROJECT OVERVIEW</span><ArrowUpRight size={16} aria-hidden="true" /></div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon"><Briefcase size={22} aria-hidden="true" /></div>
          <h3>{projects.length === 0 ? 'Start with your first project' : 'No matching projects'}</h3>
          <p>{projects.length === 0 ? 'Add a client and project to build your workspace. You can add deliverables and deadlines next.' : 'Try another search or choose a different status filter.'}</p>
          {projects.length === 0 && <button className="primary-button" type="button" onClick={() => onCreate('project')}><Plus size={16} aria-hidden="true" /> Create your first project</button>}
        </div>
      )}
    </div>
  );
}
