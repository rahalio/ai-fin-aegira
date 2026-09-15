import { Navigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { clearSession, getDisplayName, getRole, getToken } from './api';

const NAV: Array<{ to: string; label: string; roles?: string[] }> = [
  { to: '/queue', label: 'Case queue', roles: ['investigator', 'admin', 'queue_manager', 'analyst'] },
  { to: '/queue-mgmt', label: 'Queue management', roles: ['queue_manager', 'admin'] },
  { to: '/models', label: 'Models', roles: ['model_owner', 'head_of_fraud', 'admin'] },
  { to: '/metrics', label: 'Loss & FP', roles: ['head_of_fraud', 'admin', 'model_owner'] },
  { to: '/latency', label: 'Latency', roles: ['ops', 'admin', 'model_owner'] },
  { to: '/care', label: 'Care status', roles: ['care', 'admin'] },
  { to: '/handoffs', label: 'AML handoffs', roles: ['investigator', 'admin'] },
  { to: '/admin', label: 'Admin & audit', roles: ['admin'] },
];

export function roleHome(role: string) {
  switch (role) {
    case 'queue_manager':
      return '/queue-mgmt';
    case 'model_owner':
      return '/models';
    case 'head_of_fraud':
      return '/metrics';
    case 'care':
      return '/care';
    case 'admin':
      return '/admin';
    case 'ops':
      return '/latency';
    default:
      return '/queue';
  }
}

export function RequireAuth() {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function Shell() {
  const role = getRole();
  const loc = useLocation();
  const links = NAV.filter((n) => !n.roles || n.roles.includes(role) || role === 'admin');
  return (
    <div className="shell">
      <nav className="nav">
        <div className="brand">Aegira</div>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={loc.pathname.startsWith(l.to) ? 'active' : ''}>
            {l.label}
          </NavLink>
        ))}
        <div style={{ marginTop: 24, color: 'var(--color-steel)', fontSize: 12 }}>
          {getDisplayName()} · {role}
        </div>
        <button
          style={{ marginTop: 12 }}
          onClick={() => {
            clearSession();
            window.location.href = '/login';
          }}
        >
          Sign out
        </button>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
