import { useState } from 'react';
import { ArrowUpRight, Check, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useWorkspace } from '../hooks/useWorkspace';

const BENEFITS = [
  'Keep every client project and deadline in view',
  'Turn project briefs into clear deliverables',
  'See progress without juggling spreadsheets',
];

export default function LoginPage() {
  const { login } = useWorkspace();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [invalidField, setInvalidField] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanName.length < 2) {
      setInvalidField('name');
      setError('Enter a name with at least 2 characters.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setInvalidField('email');
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setInvalidField('');
    login(cleanName, cleanEmail);
  }

  return (
    <div className="login-screen">
      <a className="skip-link" href="#workspace-access">Skip to workspace access</a>
      <section className="login-showcase" aria-labelledby="login-hero-title">
        <div className="login-brand">
          <div className="brand-mark" aria-hidden="true"><Layers size={21} /></div>
          <span>orbitdesk</span>
          <span className="login-brand-tag">CLIENT WORK, IN ORDER.</span>
        </div>
        <div className="showcase-content">
          <div className="showcase-kicker"><span className="kicker-pulse" aria-hidden="true" /> A CLEARER WAY TO RUN YOUR WORK</div>
          <h1 id="login-hero-title">Good work<br /><em>starts organised.</em></h1>
          <p className="showcase-copy">Bring client projects, deliverables and deadlines into one calm workspace. Spend less time tracking work and more time moving it forward.</p>
          <div className="showcase-features">
            {BENEFITS.map((benefit) => (
              <div key={benefit}><span aria-hidden="true"><Check size={14} /></span>{benefit}</div>
            ))}
          </div>
        </div>
        <div className="showcase-bottom">
          <span><ShieldCheck size={15} aria-hidden="true" /> Separate workspace for each email</span>
          <span>ORBITDESK</span>
        </div>
        <div className="showcase-orb orb-one" aria-hidden="true" />
        <div className="showcase-orb orb-two" aria-hidden="true" />
      </section>

      <main className="login-panel" id="workspace-access" aria-labelledby="access-title">
        <div className="login-panel-top"><span>WORKSPACE ACCESS</span><ThemeToggle compact /></div>
        <div className="login-card-wrap">
          <div className="login-icon" aria-hidden="true"><Sparkles size={22} /></div>
          <span className="login-overline">YOUR WORK, YOUR SPACE</span>
          <h2 id="access-title">Welcome to<br />your workspace.</h2>
          <p>Enter your details to create a workspace or reopen one you have used in this browser.</p>

          <form className="access-form" onSubmit={handleSubmit} noValidate>
            <div className="access-field">
              <label htmlFor="access-name">Your name</label>
              <input
                id="access-name"
                name="name"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                maxLength={60}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                required
                aria-invalid={invalidField === 'name'}
                aria-describedby={invalidField === 'name' ? 'access-error' : undefined}
              />
            </div>
            <div className="access-field">
              <label htmlFor="access-email">Email address</label>
              <input
                id="access-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck="false"
                maxLength={120}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                aria-invalid={invalidField === 'email'}
                aria-describedby={invalidField === 'email' ? 'access-error' : undefined}
              />
            </div>
            {error && <p id="access-error" className="access-error" role="alert">{error}</p>}
            <button className="login-submit" type="submit">
              <span>Continue to workspace</span><ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </form>

          <p className="login-note">Use the same email on this browser to reopen your workspace. This version does not ask for a password or sync across devices.</p>
        </div>
        <div className="login-panel-footer"><span>ORBITDESK © 2026</span><span>BUILT FOR FOCUSED WORK</span></div>
      </main>
    </div>
  );
}
