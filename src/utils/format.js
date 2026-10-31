export function formatDate(value, options = { day: 'numeric', month: 'short' }) {
  if (!value) return 'No date';
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'No date';
  return new Intl.DateTimeFormat('en', options).format(date);
}

export function relativeTime(timestamp) {
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function isOverdue(dateValue, status) {
  if (!dateValue || status === 'Done') return false;
  const due = new Date(`${dateValue}T23:59:59`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}
