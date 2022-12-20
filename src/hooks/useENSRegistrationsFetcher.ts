import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { QUERY_RECENT_REGISTRATIONS } from '../api/queries';
import { ENSRegistrationType } from '../api/declarations';
import { ENSDomainInfo, parseENSInformation } from '../utils/ens';

type useENSRegistrationsFetcher = {
  loadingENSRegistrations: boolean;
  parsedENSDomains: ENSDomainInfo[];
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  hasMoreDomains: boolean;
};

export const PAGE_SIZE = 20;

export const useENSRegistrationsFetcher =
  (): useENSRegistrationsFetcher => {
    const [pageNo, setPageNo] = useState(0);
    const [fetchingDomains, setFetchingDomains] = useState(true);
    const [hasMoreDomains, setHasMoreDomains] = useState(false);
    const firstDataFetch = useRef(true);
    const [parsedENSDomains, setParsedENSDomains] = useState<
      ENSDomainInfo[]
    >([]);

    const { data, networkStatus, fetchMore } = useQuery(
      QUERY_RECENT_REGISTRATIONS,
      {
        notifyOnNetworkStatusChange: true,
        variables: {
          first: PAGE_SIZE,
          skip: 0,
        },
      },
    );

    const formatENSRegistrations = useCallback(
      async (registrations: ENSRegistrationType[]) => {
        setFetchingDomains(true);
        setHasMoreDomains(false);

        const ensInfo = await Promise.all(
          registrations.map((registration) =>
            parseENSInformation(registration),
          ),
        );

        setParsedENSDomains((domains) => [...domains, ...ensInfo]);
        setFetchingDomains(false);
        setHasMoreDomains(true);
      },
      [],
    );

    const fetchMoreENSRegistrations = useCallback(
      async (pageNo: number) => {
        if (pageNo > 0) {
          if (data.registrations.length < (pageNo + 1) * PAGE_SIZE) {
            fetchMore({
              variables: { skip: pageNo * PAGE_SIZE },
              updateQuery: (prevResponse, { fetchMoreResult }) => {
                formatENSRegistrations(fetchMoreResult.registrations);

                return {
                  registrations: [
                    ...prevResponse.registrations,
                    ...fetchMoreResult.registrations,
                  ],
                };
              },
            });
          }
        }
      },
      [formatENSRegistrations, data, fetchMore],
    );

    const loadingENSRegistrations = useMemo(
      () =>
        fetchingDomains ||
        networkStatus === NetworkStatus.fetchMore ||
        !data,
      [data, fetchingDomains, networkStatus],
    );

    useEffect(() => {
      fetchMoreENSRegistrations(pageNo);
    }, [pageNo, fetchMoreENSRegistrations]);

    useEffect(() => {
      if (firstDataFetch.current && data) {
        firstDataFetch.current = false;
        formatENSRegistrations(data.registrations);
      }
    }, [data, formatENSRegistrations]);

    return {
      loadingENSRegistrations,
      parsedENSDomains,
      pageNo,
      setPageNo,
      hasMoreDomains,
    };
  };
