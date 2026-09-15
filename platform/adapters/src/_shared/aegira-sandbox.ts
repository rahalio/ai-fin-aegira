/**
 * In-memory Aegira sandbox for generated DDB stubs (local / demo).
 */

import { ulid } from 'ulid';
import { nowIso, responseMeta } from './sandbox-store.js';

const CASE_ID = 'cse_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const CASE_ID_2 = 'cse_01HZYXK8J0M0W5N6P7Q8R9S0T1V3';
const SCORE_ID = 'scr_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const MODEL_CHAMP = 'mdl_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const MODEL_CHALL = 'mdl_01HZYXK8J0M0W5N6P7Q8R9S0T1V3';
const EXP_ID = 'exp_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const PROMO_ID = 'prm_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const ENT_ID = 'ent_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const CARE_ID = 'car_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const BREACH_ID = 'brc_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';

function meta() {
  return responseMeta('sandbox').meta;
}

function envelope<T>(data: T) {
  return { data, meta: meta() };
}

function listEnvelope<T>(items: T[]) {
  return { data: { items }, meta: { ...meta(), pagination: { limit: 50, total: items.length } } };
}

const cases = new Map<string, Record<string, unknown>>([
  [
    CASE_ID,
    {
      caseId: CASE_ID,
      scoreEventId: SCORE_ID,
      status: 'open',
      priority: 1,
      segment: 'high_value',
      slaDueAt: new Date(Date.now() + 12 * 60 * 1000).toISOString(),
      slaBreached: false,
      reasonCodes: ['velocity', 'new_payee'],
      modelVersionId: MODEL_CHAMP,
      modelVersionName: 'fraud-lstm-v4.2',
      featureSnapshotPresent: true,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    },
  ],
  [
    CASE_ID_2,
    {
      caseId: CASE_ID_2,
      scoreEventId: SCORE_ID,
      status: 'open',
      priority: 2,
      segment: 'mass_market',
      slaDueAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      slaBreached: true,
      reasonCodes: ['device_mismatch'],
      modelVersionId: MODEL_CHALL,
      modelVersionName: 'fraud-lstm-challenger-v1',
      featureSnapshotPresent: true,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    },
  ],
]);

const dispositions: Record<string, unknown>[] = [];
const handoffs: Record<string, unknown>[] = [];
let promotion = {
  promotionId: PROMO_ID,
  experimentId: EXP_ID,
  championModelId: MODEL_CHAMP,
  challengerModelId: MODEL_CHALL,
  status: 'proposed',
  criteriaMet: true,
  approverIds: [] as string[],
  createdAt: nowIso(),
  updatedAt: nowIso(),
};
let latency = {
  p99BudgetMs: 80,
  p50Ms: 12,
  p99Ms: 41,
  status: 'healthy' as string,
  createdAt: nowIso(),
  updatedAt: nowIso(),
};
let retention = { caseDays: 365, scoreSnapshotDays: 730, createdAt: nowIso(), updatedAt: nowIso() };
const policy = {
  highValueSegments: ['high_value'],
  vulnerableSegments: ['vulnerable'],
  autoPriorityBoost: 10,
  createdAt: nowIso(),
  updatedAt: nowIso(),
};

export function handleAegiraSandbox(op: string, input: Record<string, unknown>): unknown {
  switch (op) {
    case 'listFraudCases':
      return listEnvelope([...cases.values()]);
    case 'getFraudCase': {
      const row = cases.get(String(input.caseId));
      if (!row) throw Object.assign(new Error('Not found'), { statusCode: 404 });
      return envelope(row);
    }
    case 'claimFraudCase': {
      const row = cases.get(String(input.caseId));
      if (!row) throw Object.assign(new Error('Not found'), { statusCode: 404 });
      row.status = 'investigating';
      row.assignedTo = 'usr_investigator';
      row.updatedAt = nowIso();
      return envelope(row);
    }
    case 'reassignFraudCase': {
      const row = cases.get(String(input.caseId));
      if (!row) throw Object.assign(new Error('Not found'), { statusCode: 404 });
      row.assignedTo = input.assigneeUserId;
      row.updatedAt = nowIso();
      return envelope(row);
    }
    case 'getQueueHeatmap':
      return envelope({
        cells: [
          { segment: 'high_value', openCount: 1, breachedCount: 0 },
          { segment: 'mass_market', openCount: 1, breachedCount: 1 },
        ],
        generatedAt: nowIso(),
      });
    case 'listInvestigatorLoad':
      return listEnvelope([
        { userId: 'usr_01HZYXK8J0M0W5N6P7Q8R9S0T1V2', displayName: 'Demo Investigator', openCount: 1, investigatingCount: 0 },
      ]);
    case 'getPriorityPolicy':
    case 'updatePriorityPolicy':
      return envelope({ ...policy, ...input });
    case 'listDispositions':
      return listEnvelope(dispositions.filter((d) => !input.caseId || d.caseId === input.caseId));
    case 'createDisposition': {
      const row = {
        dispositionId: `dsp_${ulid()}`,
        caseId: input.caseId,
        code: input.code,
        notes: input.notes,
        locked: false,
        undoUntil: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        createdAt: nowIso(),
      };
      dispositions.push(row);
      const cse = cases.get(String(input.caseId));
      if (cse) cse.status = 'closed';
      return envelope(row);
    }
    case 'undoDisposition': {
      const row = dispositions.find((d) => d.dispositionId === input.dispositionId);
      if (!row || row.locked) throw Object.assign(new Error('Locked'), { statusCode: 409 });
      row.locked = true;
      return envelope(row);
    }
    case 'listCaseEntities':
      return listEnvelope([
        {
          entityLinkId: ENT_ID,
          caseId: CASE_ID,
          entityType: 'device',
          entityRef: 'dev_***4412',
          linkedCaseIds: [CASE_ID_2],
          createdAt: nowIso(),
        },
      ]);
    case 'listEntityHops':
      return envelope({
        entityLinkId: ENT_ID,
        remainingHops: 1,
        exhausted: false,
        linkedCaseIds: [CASE_ID_2],
      });
    case 'listFraudModels':
      return listEnvelope([
        { modelVersionId: MODEL_CHAMP, name: 'fraud-lstm-v4.2', role: 'champion', status: 'production', createdAt: nowIso() },
        { modelVersionId: MODEL_CHALL, name: 'fraud-lstm-challenger-v1', role: 'challenger', status: 'shadow', createdAt: nowIso() },
      ]);
    case 'getFraudModel':
      return envelope({
        modelVersionId: input.modelVersionId ?? MODEL_CHAMP,
        name: 'fraud-lstm-v4.2',
        role: 'champion',
        status: 'production',
        createdAt: nowIso(),
      });
    case 'listPromotionDecisions':
      return listEnvelope([promotion]);
    case 'proposePromotion':
      promotion = { ...promotion, status: 'proposed', updatedAt: nowIso() };
      return envelope(promotion);
    case 'approvePromotion': {
      const uid = String(input.orgId ?? 'usr_approver');
      if (!promotion.approverIds.includes(uid)) promotion.approverIds.push(uid);
      promotion.status = promotion.approverIds.length >= 2 ? 'approved' : 'pending_second';
      promotion.updatedAt = nowIso();
      return envelope(promotion);
    }
    case 'rejectPromotion':
      promotion = { ...promotion, status: 'rejected', updatedAt: nowIso() };
      return envelope(promotion);
    case 'rollbackPromotion':
      promotion = { ...promotion, status: 'rolled_back', updatedAt: nowIso() };
      return envelope(promotion);
    case 'listChallengerExperiments':
    case 'getChallengerExperiment':
    case 'createChallengerExperiment':
    case 'abortChallengerExperiment': {
      const exp = {
        experimentId: EXP_ID,
        challengerModelId: MODEL_CHALL,
        trafficPct: 5,
        status: op === 'abortChallengerExperiment' ? 'aborted' : 'running',
        liftSummary: '+4.2% precision, FP -0.3pp',
        precisionDelta: 0.042,
        falsePositiveDelta: -0.003,
        criteria: { minPrecisionLift: 0.02, maxFpIncrease: 0.01, met: true },
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      return op.startsWith('list') ? listEnvelope([exp]) : envelope(exp);
    }
    case 'listAmlHandoffs':
      return listEnvelope(handoffs);
    case 'createAmlHandoff': {
      if (handoffs.some((h) => h.caseId === input.caseId && h.status === 'submitted')) {
        throw Object.assign(new Error('Duplicate'), { statusCode: 409 });
      }
      const row = {
        handoffId: `hnd_${ulid()}`,
        caseId: input.caseId,
        reasonCode: input.reasonCode,
        status: 'submitted',
        createdAt: nowIso(),
      };
      handoffs.push(row);
      return envelope(row);
    }
    case 'getAmlHandoff':
      return envelope(handoffs.find((h) => h.handoffId === input.handoffId) ?? handoffs[0]);
    case 'acceptAmlHandoff':
    case 'rejectAmlHandoff': {
      const row = handoffs.find((h) => h.handoffId === input.handoffId) ?? handoffs[0];
      if (row) {
        row.status = op.startsWith('accept') ? 'accepted' : 'rejected';
        row.note = input.note;
      }
      return envelope(row);
    }
    case 'getCareStatus':
    case 'requestCareCallback':
    case 'noteCareCallOutcome':
      return envelope({
        careStatusId: CARE_ID,
        paymentRefMasked: '****4412',
        lockState: 'locked',
        paymentState: 'held',
        allowedCareActions: ['request_callback'],
        callbackRequested: op === 'requestCareCallback',
        lastCallOutcome: input.outcome,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      });
    case 'getOpsMetricsOverview':
      return envelope({
        lossPrevented: { amount: '1284000.00', currency: 'USD' },
        falsePositiveCost: { amount: '186000.00', currency: 'USD' },
        frictionEvents: 412,
        investigatorHoursPerConfirmed: 1.4,
        labellingCoveragePct: 91,
        generatedAt: nowIso(),
      });
    case 'getWeeklyLift':
      return envelope({
        weekStart: '2026-09-08',
        championPrecision: 0.81,
        challengerPrecision: 0.852,
        falsePositiveDelta: -0.003,
        experimentId: EXP_ID,
      });
    case 'getDispositionMix':
      return envelope({
        fraudConfirmed: 42,
        friendlyFraud: 8,
        falsePositive: 19,
        unableToDetermine: 6,
      });
    case 'listScoreEvents':
    case 'getScoreEvent':
    case 'scoreTransaction':
      return op === 'listScoreEvents'
        ? listEnvelope([
            {
              scoreEventId: SCORE_ID,
              transactionRef: 'txn_4412',
              modelVersionId: MODEL_CHAMP,
              modelVersionName: 'fraud-lstm-v4.2',
              modelRole: 'champion',
              score: 0.91,
              decision: 'case',
              latencyMs: 18,
              featureHighlights: [{ key: 'device_age_days', contribution: 0.22, displayValue: '2' }],
              createdAt: nowIso(),
            },
          ])
        : envelope({
            scoreEventId: SCORE_ID,
            transactionRef: String(input.transactionRef ?? 'txn_4412'),
            modelVersionId: MODEL_CHAMP,
            modelVersionName: 'fraud-lstm-v4.2',
            modelRole: 'champion',
            score: 0.91,
            decision: 'case',
            latencyMs: 18,
            featureHighlights: [{ key: 'device_age_days', contribution: 0.22, displayValue: '2' }],
            createdAt: nowIso(),
          });
    case 'getScoringLatencyHealth':
    case 'updateScoringLatencyBudget':
      if (input.p99BudgetMs) latency = { ...latency, p99BudgetMs: Number(input.p99BudgetMs), updatedAt: nowIso() };
      return envelope(latency);
    case 'acknowledgeLatencyBreach':
      return envelope({
        breachId: BREACH_ID,
        p99Ms: 120,
        budgetMs: 80,
        status: 'acknowledged',
        acknowledgedAt: nowIso(),
        createdAt: nowIso(),
      });
    case 'listCaseAccessLog':
      return listEnvelope([
        { logId: 'aud_01HZYXK8J0M0W5N6P7Q8R9S0T1V2', caseId: CASE_ID, actorUserId: 'usr_01HZYXK8J0M0W5N6P7Q8R9S0T1V2', action: 'view', createdAt: nowIso() },
      ]);
    case 'listPromotionAudit':
      return listEnvelope([
        { logId: 'aud_01HZYXK8J0M0W5N6P7Q8R9S0T1V3', promotionId: PROMO_ID, actorUserId: 'usr_01HZYXK8J0M0W5N6P7Q8R9S0T1V2', action: 'propose', createdAt: nowIso() },
      ]);
    case 'getRetentionPolicy':
    case 'updateRetentionPolicy':
      retention = { ...retention, ...input, updatedAt: nowIso() };
      return envelope(retention);
    case 'exportAssurancePack':
      return envelope({ packId: `pck_${ulid()}`, status: 'ready', downloadHint: 'sandbox://assurance.json', createdAt: nowIso() });
    default:
      return envelope({ op, input });
  }
}
