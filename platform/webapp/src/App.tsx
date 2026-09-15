import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, Shell } from './shell';
import {
  AdminPage,
  CarePage,
  CaseDetailPage,
  EntityPage,
  HandoffsPage,
  HomeRedirect,
  LatencyPage,
  LoginPage,
  MetricsPage,
  ModelsPage,
  QueueMgmtPage,
  QueuePage,
} from './pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Shell />}>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/cases/:caseId" element={<CaseDetailPage />} />
            <Route path="/cases/:caseId/entities" element={<EntityPage />} />
            <Route path="/queue-mgmt" element={<QueueMgmtPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/latency" element={<LatencyPage />} />
            <Route path="/care" element={<CarePage />} />
            <Route path="/handoffs" element={<HandoffsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
