import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { DomainCard } from '../core/cards/domain-card';
import { useENSRegistrationsFetcher } from '../../hooks';
import { CardSkeleton, VirtualizedGrid } from '../core';

/* --------------------------------------------------------------------------
 * Domains List Component
 * --------------------------------------------------------------------------*/

export const DomainsList = () => {
  const [loadingMoreDomains, setLoadingMoreDomains] = useState(false);

  const {
    loadingENSRegistrations,
    parsedENSDomains,
    pageNo,
    setPageNo,
    hasMoreDomains,
  } = useENSRegistrationsFetcher();

  useEffect(() => {
    setLoadingMoreDomains(false);
  }, [parsedENSDomains]);

  const loadMoreNFTS = () => {
    if (
      loadingMoreDomains ||
      loadingENSRegistrations ||
      parsedENSDomains.length === 0
    )
      return;

    setLoadingMoreDomains(true);
    setPageNo((pageNo) => pageNo + 1);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMoreNFTS}
      hasMore={!loadingENSRegistrations && hasMoreDomains}
      useWindow
      threshold={500}
      className="infinite-loader"
    >
      <VirtualizedGrid
        loadingMore={!loadingENSRegistrations && hasMoreDomains}
        items={parsedENSDomains}
        ItemRenderer={React.memo((domainData) => (
          <DomainCard data={domainData} key={domainData.domain} />
        ))}
        Skeleton={CardSkeleton}
      />
    </InfiniteScroll>
  );
};
