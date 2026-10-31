import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import Modal from './Modal';

const ACCENTS = ['violet', 'blue', 'orange', 'green'];

export default function ProjectModal({ onClose }) {
  const { addProject, projects } = useWorkspace();
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [type, setType] = useState('Website');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim() || !client.trim() || !dueDate) { setError('Project name, client and deadline are required.'); return; }
    addProject({ id: `project-${Date.now()}`, name: name.trim(), client: client.trim(), type, dueDate, description: description.trim() || 'Project details to be confirmed.', status: 'Planning', accent: ACCENTS[projects.length % ACCENTS.length] });
    onClose();
  };
  return <Modal title="Create a client project" description="Start with the essentials. You can add deliverables after creating it." onClose={onClose}>
    <form className="modal-form" onSubmit={submit}>
      <label>Project name<input autoFocus maxLength={48} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Brand website redesign" required /></label>
      <label>Client name<input maxLength={42} value={client} onChange={(event) => setClient(event.target.value)} placeholder="e.g. Northstar Dental" required /></label>
      <div className="form-two-col"><label>Project type<select value={type} onChange={(event) => setType(event.target.value)}><option>Website</option><option>Web application</option><option>E-commerce</option><option>Landing page</option><option>Maintenance</option><option>Other</option></select></label><label>Deadline<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required /></label></div>
      <label>Short brief <span className="optional-label">OPTIONAL</span><textarea rows="3" maxLength="180" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What are you building for this client?" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create project</button></div>
    </form>
  </Modal>;
}
