import { providers } from 'ethers';
import { ENSRegistrationType } from '../api/declarations';

const MS_IN_SECONDS = 1000;

export type ENSDomainInfo = {
  registrant: string;
  assignedETHAddress: string;
  registrationDate: Date;
  expiryDate: Date;
  domain: string;
};

export const parseENSInformation = async (
  registration: ENSRegistrationType,
  address?: string,
): Promise<ENSDomainInfo> => {
  return {
    registrant: registration.registrant.id,
    assignedETHAddress:
      address || registration.domain.resolvedAddress?.id || '-',
    expiryDate: new Date(registration.expiryDate * MS_IN_SECONDS),
    registrationDate: new Date(
      registration.registrationDate * MS_IN_SECONDS,
    ),
    domain: registration.domain.name,
  };
};

export const formatENSName = (name?: string) => {
  if (!name) {
    return '';
  }

  if (name.length < 14) return name;

  return `${name.substring(0, 4)}...${name.substring(
    name.length - 6,
    name.length,
  )}`;
};

export const reverselookupProvider =
  new providers.StaticJsonRpcProvider(
    'https://mainnet.infura.io/v3/d3f3bd685a4849c2a092982af5e5cd88',
  );
