import { Briefcase, CalendarDays, Check, Circle, Clock, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import { formatDate, isOverdue } from '../utils/format';

const STATUSES = ['To do', 'In progress', 'In review', 'Done'];

export default function DeliverablesPage({ onCreate, onNavigate }) {
  const { projects, deliverables, updateDeliverable, deleteDeliverable } = useWorkspace();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const projectMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects],
  );
  const filtered = useMemo(() => deliverables.filter((item) => {
    const projectName = projectMap[item.projectId]?.name || '';
    const matchesQuery = `${item.title} ${projectName}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || (filter === 'Open' ? item.status !== 'Done' : item.status === filter);
    return matchesQuery && matchesFilter;
  }).sort((a, b) => a.dueDate.localeCompare(b.dueDate)), [deliverables, query, filter, projectMap]);
  const openTotal = deliverables.filter((item) => item.status !== 'Done').length;
  const doneTotal = deliverables.length - openTotal;

  return (
    <div className="page-stack">
      <div className="page-intro-row">
        <div><h2>From brief to done</h2><p>Break client projects into small, trackable pieces of work.</p></div>
        {projects.length > 0
          ? <button className="primary-button" type="button" onClick={() => onCreate('deliverable')}><Plus size={17} aria-hidden="true" /> Add deliverable</button>
          : <button className="primary-button" type="button" onClick={() => onNavigate('projects')}><Plus size={17} aria-hidden="true" /> Create a project first</button>}
      </div>

      <div className="deliverable-summary" aria-label="Deliverable summary">
        <div><span className="summary-symbol summary-open" aria-hidden="true"><Circle size={17} /></span><span><strong>{openTotal}</strong><small>Open items</small></span></div>
        <div><span className="summary-symbol summary-done" aria-hidden="true"><Check size={17} /></span><span><strong>{doneTotal}</strong><small>Completed</small></span></div>
        <div><span className="summary-symbol summary-date" aria-hidden="true"><CalendarDays size={17} /></span><span><strong>{deliverables.filter((item) => isOverdue(item.dueDate, item.status)).length}</strong><small>Overdue</small></span></div>
      </div>

      <section className="content-card deliverables-card" aria-label="Deliverables list">
        <div className="deliverables-toolbar">
          <label className="search-field" htmlFor="deliverable-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search deliverables</span><input id="deliverable-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a deliverable..." /></label>
          <div className="filter-tabs" role="group" aria-label="Filter deliverables by status">
            {['All', 'Open', ...STATUSES].map((item) => <button key={item} className={filter === item ? 'selected' : ''} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state compact-empty"><div className="empty-state-icon"><Briefcase size={21} aria-hidden="true" /></div><h3>Create a project to get started</h3><p>Every deliverable belongs to a project. Create your first project before adding work items.</p><button className="primary-button" type="button" onClick={() => onNavigate('projects')}>Go to projects</button></div>
        ) : filtered.length > 0 ? (
          <div className="deliverable-table-wrap">
            <table className="deliverable-table">
              <caption className="sr-only">Deliverables with project, priority, due date and current status</caption>
              <thead><tr><th scope="col">DELIVERABLE</th><th scope="col">PROJECT</th><th scope="col">PRIORITY</th><th scope="col">DUE DATE</th><th scope="col">STATUS</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
              <tbody>
                {filtered.map((item) => {
                  const overdue = isOverdue(item.dueDate, item.status);
                  return (
                    <tr key={item.id}>
                      <td><div className="deliverable-title"><span className={`table-check ${item.status === 'Done' ? 'done' : ''}`} aria-hidden="true">{item.status === 'Done' ? <Check size={13} /> : <Circle size={13} />}</span><strong className={item.status === 'Done' ? 'task-completed' : ''}>{item.title}</strong></div></td>
                      <td><span className="table-project">{projectMap[item.projectId]?.name || 'Unassigned'}</span></td>
                      <td><span className={`priority priority-${item.priority.toLowerCase()}`}><i aria-hidden="true" />{item.priority}</span></td>
                      <td><span className={overdue ? 'overdue-date' : 'table-date'}>{overdue && <Clock size={13} aria-hidden="true" />}{formatDate(item.dueDate, { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                      <td><label className="sr-only" htmlFor={`status-${item.id}`}>Status for {item.title}</label><select id={`status-${item.id}`} className={`status-select status-select-${item.status.toLowerCase().replaceAll(' ', '-')}`} value={item.status} onChange={(event) => updateDeliverable(item.id, event.target.value)}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></td>
                      <td><button className="row-delete" type="button" onClick={() => deleteDeliverable(item.id)} aria-label={`Delete ${item.title}`} title="Delete deliverable"><Trash2 size={15} aria-hidden="true" /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state compact-empty"><div className="empty-state-icon"><Search size={21} aria-hidden="true" /></div><h3>{deliverables.length ? 'No deliverables found' : 'No deliverables yet'}</h3><p>{deliverables.length ? 'Try clearing the search or changing the status filter.' : 'Add the first piece of work for one of your projects.'}</p>{deliverables.length === 0 && <button className="primary-button" type="button" onClick={() => onCreate('deliverable')}>Add your first deliverable</button>}</div>
        )}
        <div className="table-footer"><span>Showing {filtered.length} of {deliverables.length} deliverables</span><span>Changes save automatically</span></div>
      </section>
    </div>
  );
}
