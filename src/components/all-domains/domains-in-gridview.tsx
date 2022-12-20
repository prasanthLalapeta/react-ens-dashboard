import { useENSRegistrationsFetcher } from '../../hooks';
import { DomainsList } from '../domains-list';
import { CardsSkeletonList } from '../cards-skeleton-list';
import {
  Container,
  FilteredContainer,
  SkeletonListWrapper,
} from './styles';

/* --------------------------------------------------------------------------
 * DomainsInGridView Component
 * --------------------------------------------------------------------------*/

export const DomainsInGridView = () => {
  const { loadingENSRegistrations, parsedENSDomains } =
    useENSRegistrationsFetcher();

  return (
    <Container>
      <FilteredContainer>
        {loadingENSRegistrations && parsedENSDomains.length === 0 ? (
          <SkeletonListWrapper>
            <CardsSkeletonList />
          </SkeletonListWrapper>
        ) : (
          <DomainsList />
        )}
      </FilteredContainer>
    </Container>
  );
};
