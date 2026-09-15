import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, Envelope, ListEnvelope, setSession } from './api';
import { roleHome } from './shell';

type CaseRow = {
  caseId: string;
  status: string;
  priority: number;
  segment?: string;
  slaDueAt?: string;
  slaBreached?: boolean;
  reasonCodes?: string[];
  modelVersionName?: string;
  modelVersionId?: string;
  featureSnapshotPresent?: boolean;
};

function remaining(iso?: string) {
  if (!iso) return '—';
  const ms = new Date(iso).getTime() - Date.now();
  const m = Math.round(ms / 60000);
  return m < 0 ? `${Math.abs(m)}m overdue` : `${m}m`;
}

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('investigator@demo.local');
  const [password, setPassword] = useState('sandbox-invest-8');
  const [error, setError] = useState('');
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await api<Envelope<{ accessToken: string; operator: { role: string; displayName: string } }>>(
        '/v0/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) },
      );
      setSession(res.data.accessToken, res.data.operator.role, res.data.operator.displayName);
      nav(roleHome(res.data.operator.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }
  return (
    <form className="login" onSubmit={onSubmit}>
      <h1>Aegira</h1>
      <p>Cases, not silent scores</p>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="primary" type="submit" style={{ marginTop: 16 }}>
        Sign in
      </button>
    </form>
  );
}

export function QueuePage() {
  const [rows, setRows] = useState<CaseRow[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    api<ListEnvelope<CaseRow>>('/v1/cases')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }, []);
  return (
    <div>
      <h1 className="page-title">Investigator queue</h1>
      {error ? <div className="banner red">{error}</div> : null}
      {rows.length === 0 && !error ? <div className="panel">Queue clear—check shadow challenger noise</div> : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Case</th>
              <th>Segment</th>
              <th>SLA</th>
              <th>Reasons</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.caseId}>
                <td>{c.priority}</td>
                <td>
                  <Link className="mono" to={`/cases/${c.caseId}`}>
                    {c.caseId}
                  </Link>
                </td>
                <td>{c.segment}</td>
                <td>
                  <span className={`chip ${c.slaBreached ? 'red' : 'sodium'}`}>{remaining(c.slaDueAt)}</span>
                </td>
                <td>{(c.reasonCodes ?? []).join(', ')}</td>
                <td className="mono">{c.modelVersionName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CaseDetailPage() {
  const { caseId = '' } = useParams();
  const [row, setRow] = useState<CaseRow | null>(null);
  const [entities, setEntities] = useState<Array<{ entityLinkId: string; entityType: string; entityRef: string }>>([]);
  const [code, setCode] = useState('false_positive');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    api<Envelope<CaseRow>>(`/v1/cases/${caseId}`).then((r) => setRow(r.data));
    api<ListEnvelope<{ entityLinkId: string; entityType: string; entityRef: string }>>(`/v1/cases/${caseId}/entities`).then(
      (r) => setEntities(r.data.items),
    );
  }, [caseId]);
  async function claim() {
    await api(`/v1/cases/${caseId}/claim`, { method: 'POST' });
    const r = await api<Envelope<CaseRow>>(`/v1/cases/${caseId}`);
    setRow(r.data);
  }
  async function dispose() {
    await api(`/v1/cases/${caseId}/dispositions`, { method: 'POST', body: JSON.stringify({ code }) });
    setMsg('Disposition locked after short undo window.');
  }
  async function escalate() {
    await api('/v1/aml-handoffs', { method: 'POST', body: JSON.stringify({ caseId, reasonCode: 'structuring_pattern' }) });
    setMsg('AML handoff submitted.');
  }
  if (!row) return <p>Loading…</p>;
  return (
    <div>
      <h1 className="page-title">
        Case <span className="mono">{row.caseId}</span>
      </h1>
      {!row.featureSnapshotPresent ? <div className="banner red">Missing feature snapshot — do not dispose blindly</div> : null}
      <div className="panel">
        <div className="row-actions">
          <span className="chip">{row.status}</span>
          <span className={`chip ${row.slaBreached ? 'red' : 'sodium'}`}>{remaining(row.slaDueAt)}</span>
          <span className="chip mint">{row.modelVersionName}</span>
          <button onClick={claim}>Claim</button>
        </div>
        <p>Reasons: {(row.reasonCodes ?? []).join(', ')}</p>
      </div>
      <div className="panel">
        <h3>Feature highlights</h3>
        <p className="mono">device_age_days · 2 · no PAN</p>
      </div>
      <div className="panel">
        <h3>Entity links</h3>
        {entities.length === 0 ? <p>Singleton event</p> : null}
        <ul>
          {entities.map((e) => (
            <li key={e.entityLinkId}>
              {e.entityType} · <span className="mono">{e.entityRef}</span>
            </li>
          ))}
        </ul>
        <Link to={`/cases/${caseId}/entities`}>Open graph</Link>
      </div>
      <div className="panel">
        <h3>Disposition dock</h3>
        <select value={code} onChange={(e) => setCode(e.target.value)}>
          <option value="fraud_confirmed">Fraud confirmed</option>
          <option value="friendly_fraud">Friendly fraud</option>
          <option value="false_positive">False positive</option>
          <option value="unable_to_determine">Unable to determine</option>
        </select>
        <div className="row-actions" style={{ marginTop: 12 }}>
          <button className="primary" onClick={dispose}>
            Submit disposition
          </button>
          <button onClick={escalate}>Escalate to AML</button>
        </div>
        {msg ? <p className="chip mint">{msg}</p> : null}
      </div>
    </div>
  );
}

export function EntityPage() {
  const { caseId = '' } = useParams();
  const [items, setItems] = useState<Array<{ entityLinkId: string; entityType: string; entityRef: string }>>([]);
  useEffect(() => {
    api<ListEnvelope<{ entityLinkId: string; entityType: string; entityRef: string }>>(`/v1/cases/${caseId}/entities`).then(
      (r) => setItems(r.data.items),
    );
  }, [caseId]);
  return (
    <div>
      <h1 className="page-title">Entity links</h1>
      <div className="panel">
        {items.map((e) => (
          <p key={e.entityLinkId}>
            {e.entityType} · <span className="mono">{e.entityRef}</span> · hops remaining 1
          </p>
        ))}
      </div>
    </div>
  );
}

export function QueueMgmtPage() {
  const [heat, setHeat] = useState<Array<{ segment: string; openCount: number; breachedCount: number }>>([]);
  useEffect(() => {
    api<Envelope<{ cells: Array<{ segment: string; openCount: number; breachedCount: number }> }>>('/v1/queue/heatmap').then(
      (r) => setHeat(r.data.cells),
    );
  }, []);
  return (
    <div>
      <h1 className="page-title">Queue management</h1>
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Segment</th>
              <th>Open</th>
              <th>SLA breached</th>
            </tr>
          </thead>
          <tbody>
            {heat.map((c) => (
              <tr key={c.segment}>
                <td>{c.segment}</td>
                <td>{c.openCount}</td>
                <td className={c.breachedCount ? 'error' : ''}>{c.breachedCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ModelsPage() {
  const [models, setModels] = useState<Array<{ modelVersionId: string; name: string; role: string; status: string }>>([]);
  const [promo, setPromo] = useState<{ status: string; approverIds: string[] } | null>(null);
  useEffect(() => {
    api<ListEnvelope<{ modelVersionId: string; name: string; role: string; status: string }>>('/v1/models').then((r) =>
      setModels(r.data.items),
    );
    api<ListEnvelope<{ status: string; approverIds: string[] }>>('/v1/promotions').then((r) => setPromo(r.data.items[0] ?? null));
  }, []);
  async function approve() {
    const list = await api<ListEnvelope<{ promotionId: string }>>('/v1/promotions');
    const id = list.data.items[0]?.promotionId;
    if (!id) return;
    const r = await api<Envelope<{ status: string; approverIds: string[] }>>(`/v1/promotions/${id}/approve`, { method: 'POST' });
    setPromo(r.data);
  }
  return (
    <div>
      <h1 className="page-title">Models and experiments</h1>
      <div className="panel">
        {models.map((m) => (
          <p key={m.modelVersionId}>
            <span className="chip mint">{m.role}</span> {m.name} · {m.status}
          </p>
        ))}
      </div>
      <div className="panel">
        <h3>Dual-control promote</h3>
        <p>Status: {promo?.status} · approvers {promo?.approverIds?.length ?? 0}/2</p>
        <button className="primary" onClick={approve}>
          Record approval
        </button>
      </div>
    </div>
  );
}

export function MetricsPage() {
  const [ov, setOv] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    api<Envelope<Record<string, unknown>>>('/v1/metrics/overview').then((r) => setOv(r.data));
  }, []);
  const loss = ov?.lossPrevented as { amount?: string; currency?: string } | undefined;
  const fp = ov?.falsePositiveCost as { amount?: string; currency?: string } | undefined;
  return (
    <div>
      <h1 className="page-title">Loss and false-positive cost</h1>
      <div className="kpis">
        <div className="panel kpi">
          <div>Loss prevented</div>
          <div className="n">
            {loss?.amount} {loss?.currency}
          </div>
        </div>
        <div className="panel kpi">
          <div>FP cost</div>
          <div className="n">
            {fp?.amount} {fp?.currency}
          </div>
        </div>
        <div className="panel kpi">
          <div>Friction events</div>
          <div className="n">{String(ov?.frictionEvents ?? '—')}</div>
        </div>
      </div>
    </div>
  );
}

export function LatencyPage() {
  const [h, setH] = useState<{ p99Ms: number; p99BudgetMs: number; status: string } | null>(null);
  useEffect(() => {
    api<Envelope<{ p99Ms: number; p99BudgetMs: number; status: string }>>('/v1/scoring/latency').then((r) => setH(r.data));
  }, []);
  const breach = h && h.p99Ms > h.p99BudgetMs;
  return (
    <div>
      <h1 className="page-title">Hot-path latency</h1>
      {breach ? <div className="banner red" role="alert">p99 over budget — page on-call</div> : <div className="banner sodium">Healthy strip</div>}
      <div className="panel">
        p99 {h?.p99Ms}ms vs budget {h?.p99BudgetMs}ms · {h?.status}
      </div>
    </div>
  );
}

export function CarePage() {
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [ref, setRef] = useState('pay_4412');
  async function lookup() {
    const r = await api<Envelope<Record<string, unknown>>>(`/v1/care/status?paymentRef=${encodeURIComponent(ref)}`);
    setStatus(r.data);
  }
  return (
    <div>
      <h1 className="page-title">Care-safe status</h1>
      <div className="panel">
        <label>
          Payment ref
          <input value={ref} onChange={(e) => setRef(e.target.value)} />
        </label>
        <button className="primary" style={{ marginTop: 12 }} onClick={lookup}>
          Lookup
        </button>
      </div>
      {status ? (
        <div className="panel">
          <p>Lock: {String(status.lockState)}</p>
          <p>Payment: {String(status.paymentState)}</p>
          <p>Masked: {String(status.paymentRefMasked)}</p>
        </div>
      ) : null}
    </div>
  );
}

export function HandoffsPage() {
  const [items, setItems] = useState<Array<{ handoffId: string; caseId: string; status: string; reasonCode: string }>>([]);
  useEffect(() => {
    api<ListEnvelope<{ handoffId: string; caseId: string; status: string; reasonCode: string }>>('/v1/aml-handoffs').then((r) =>
      setItems(r.data.items),
    );
  }, []);
  return (
    <div>
      <h1 className="page-title">AML handoffs</h1>
      <div className="panel">
        {items.length === 0 ? <p>No open handoffs</p> : null}
        {items.map((h) => (
          <p key={h.handoffId}>
            <span className="mono">{h.handoffId}</span> · {h.reasonCode} · {h.status}
          </p>
        ))}
      </div>
    </div>
  );
}

export function AdminPage() {
  const [logs, setLogs] = useState<Array<{ logId: string; action: string; caseId: string }>>([]);
  useEffect(() => {
    api<ListEnvelope<{ logId: string; action: string; caseId: string }>>('/v1/audit/case-access').then((r) => setLogs(r.data.items));
  }, []);
  return (
    <div>
      <h1 className="page-title">Admin and audit</h1>
      <div className="panel">
        {logs.map((l) => (
          <p key={l.logId} className="mono">
            {l.action} {l.caseId}
          </p>
        ))}
      </div>
    </div>
  );
}

export function HomeRedirect() {
  const nav = useNavigate();
  const dest = useMemo(() => roleHome(localStorage.getItem('aegira.role') ?? 'investigator'), []);
  useEffect(() => {
    nav(dest, { replace: true });
  }, [dest, nav]);
  return null;
}
