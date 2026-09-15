/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@aegira/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  scrId(): string;
  cseId(): string;
  dspId(): string;
  entId(): string;
  mdlId(): string;
  expId(): string;
  prmId(): string;
  hndId(): string;
  carId(): string;
  mtrId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
