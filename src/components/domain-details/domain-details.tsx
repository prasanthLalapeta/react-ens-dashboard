import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AboutAccordion, ActionButton } from '../core';
import { DomainMetaData } from '../domain-metadata';
import { DomainActionBar } from '../domain-action-bar';
import {
  Container,
  Wrapper,
  PreviewContainer,
  DetailsContainer,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import {
  NotFoundWrapper,
  NotFoundIcon,
  NotFoundText,
  ButtonWrapper,
} from '../../views/PageNotFoundView/styles';
import DomainDetailsSkeleton from './domain-details-skeleton';
import { NameTooltip } from '../core/tooltip';
import {
  UseENSDomainSearch,
  SearchStatusType,
} from '../../hooks/useENSDomainSearch';

/* --------------------------------------------------------------------------
 * Domain Details Component
 * --------------------------------------------------------------------------*/

export const DomainDetails = () => {
  const { setSearchValue, status, domainDetails } =
    UseENSDomainSearch();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    setSearchValue(id);
  }, [id]);

  const navigate = useNavigate();

  const handleViewCollections = () => {
    navigate('/');
  };

  if (status.type === SearchStatusType.Error) {
    return (
      <Container>
        <NotFoundWrapper>
          <NotFoundIcon>404</NotFoundIcon>
          <NotFoundText>{status.error}</NotFoundText>
          <ButtonWrapper>
            <ActionButton
              type="primary"
              onClick={handleViewCollections}
            >
              Take me home
            </ActionButton>
          </ButtonWrapper>
        </NotFoundWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <DomainActionBar />
      {status.type === SearchStatusType.Loading ? (
        <DomainDetailsSkeleton />
      ) : (
        <Wrapper>
          <PreviewContainer>
            <NameCardBg>
              <NameCardContainer>
                <NameCardCollection
                  src="https://seeklogo.com/images/E/ethereum-name-service-ens-logo-B6AE963A1D-seeklogo.com.png"
                  alt="ens-logo"
                />
                <NameCardTitle>
                  <NameTooltip
                    name={domainDetails && domainDetails.domain}
                  />
                </NameCardTitle>
              </NameCardContainer>
            </NameCardBg>
          </PreviewContainer>
          <DetailsContainer>
            {domainDetails && domainDetails.domain && (
              <DomainMetaData domain={domainDetails.domain} />
            )}
            {domainDetails && domainDetails.domain && (
              <AboutAccordion data={domainDetails} />
            )}
          </DetailsContainer>
        </Wrapper>
      )}
    </Container>
  );
};
