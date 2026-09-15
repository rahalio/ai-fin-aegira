/**
 * ID Generator Service Implementation — starter prefixes.
 */

import type { DomainCode } from '@aegira/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@aegira/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@aegira/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  scrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.scoring);
  }
  cseId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.cases);
  }
  dspId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.dispositions);
  }
  entId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.entities);
  }
  mdlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.models);
  }
  expId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.experiments);
  }
  prmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.promotions);
  }
  hndId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.handoffs);
  }
  carId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.care);
  }
  mtrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.metrics);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.audit);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
