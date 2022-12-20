import { useCallback, useEffect, useState } from 'react';
import { QUERY_BY_ENS_NAME } from '../api/queries';
import createApolloClient from '../api/client';
import { ENSDomainInfo, parseENSInformation } from '../utils/ens';

import { useDebounce } from './useDebounce';

enum SearchErrorCodes {
  DOMAIN_INVALID = 'The input does not resemble an ENS domain.',
  DOMAIN_NOT_REGISTERED = 'ENS domain given is not registered',
}

export enum SearchStatusType {
  Empty,
  Loading,
  Error,
  Success,
}

type SearchStatus =
  | { type: SearchStatusType.Empty }
  | { type: SearchStatusType.Loading }
  | { type: SearchStatusType.Error; error?: string }
  | { type: SearchStatusType.Success; info: ENSDomainInfo };

type UseENSDomainSearch = {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
  status: SearchStatus;
  domainDetails?: ENSDomainInfo;
};

const endsWithETH = (domain: string): boolean => {
  return domain.substring(domain.length - 4) === '.eth';
};

export const UseENSDomainSearch = (): UseENSDomainSearch => {
  const [target, setTarget] = useState('');
  const [domainDetails, setDomainDetails] = useState<ENSDomainInfo>();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({
    type: SearchStatusType.Loading,
  });
  const debouncedTarget = useDebounce(target);

  const searchByDomainName = useCallback(
    async (target: string, progress: { active: boolean }) => {
      const {
        data: { registrations },
      } = await createApolloClient.query({
        query: QUERY_BY_ENS_NAME,
        variables: { name: target },
      });

      if (registrations.length === 0) {
        progress.active &&
          setSearchStatus({
            type: SearchStatusType.Error,
            error: SearchErrorCodes.DOMAIN_NOT_REGISTERED,
          });
      } else {
        progress.active &&
          setSearchStatus({
            type: SearchStatusType.Success,
            info: await parseENSInformation(registrations[0]),
          });
        const parsedDomainDetails = await parseENSInformation(
          registrations[0],
        );
        setDomainDetails(parsedDomainDetails);
      }
    },
    [],
  );

  useEffect(() => {
    const progress = { active: true };

    if (!debouncedTarget.length) {
      setSearchStatus({ type: SearchStatusType.Loading });
    } else {
      setSearchStatus({ type: SearchStatusType.Loading });
      if (!endsWithETH(debouncedTarget)) {
        setSearchStatus({
          type: SearchStatusType.Error,
          error: SearchErrorCodes.DOMAIN_INVALID,
        });
      } else {
        if (endsWithETH(debouncedTarget)) {
          searchByDomainName(debouncedTarget, progress);
        }
      }
    }

    return () => {
      progress.active = false;
    };
  }, [debouncedTarget, searchByDomainName]);

  return {
    searchValue: target,
    setSearchValue: setTarget,
    status: searchStatus,
    domainDetails,
  };
};
