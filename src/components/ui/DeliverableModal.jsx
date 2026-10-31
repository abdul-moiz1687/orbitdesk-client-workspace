import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from './Modal';

export default function DeliverableModal({ onClose }) {
  const { addDeliverable, projects } = useWorkspace();
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!title.trim() || !projectId || !dueDate) { setError('A title, project and due date are required.'); return; }
    addDeliverable({ id: `item-${Date.now()}`, title: title.trim(), projectId, priority, dueDate, status: 'To do' });
    onClose();
  };
  return <Modal title="Add a deliverable" description="Turn the next piece of client work into a trackable action." onClose={onClose}>
    <form className="modal-form" onSubmit={submit}>
      <label>What needs to get done?<input autoFocus maxLength={90} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Test the mobile checkout flow" required /></label>
      <label>Attach to project<select value={projectId} onChange={(event) => setProjectId(event.target.value)} required>{projects.map((project) => <option key={project.id} value={project.id}>{project.name} — {project.client}</option>)}</select></label>
      <div className="form-two-col"><label>Priority<select value={priority} onChange={(event) => setPriority(event.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label><label>Due date<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required /></label></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Add deliverable</button></div>
    </form>
  </Modal>;
}
