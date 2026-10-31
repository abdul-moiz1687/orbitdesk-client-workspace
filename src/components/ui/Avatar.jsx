export default function Avatar({ name = 'User', size = 'md' }) {
  const initials = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U';
  return <span className={`avatar avatar-${size}`} aria-hidden="true">{initials}</span>;
}
