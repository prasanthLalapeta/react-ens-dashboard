import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  SearchResultsContainer,
  ItemsEmptyContainer,
  ItemsListContainer,
  ItemDetailsWrapper,
  ItemDetails,
  ItemNameContainer,
  ItemName,
  ItemDescription,
  PriceDetails,
  LoadingWrapper,
  ItemDetailsContainer,
  StyledRouterLink,
  MediaWrapper,
  PreviewDetails,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import { SpinnerIcon } from '../icons/custom';
import config from '../../config/env';
import {
  UseENSDomainSearch,
  SearchStatusType,
} from '../../hooks/useENSDomainSearch';

type DomainSearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

/* --------------------------------------------------------------------------
 * Domain results Component
 * --------------------------------------------------------------------------*/

const DomainSearchResults = ({
  searchText,
  closeDropDown,
}: DomainSearchResultsTypes) => {
  const { t } = useTranslation();
  const { setSearchValue, status, domainDetails } =
    UseENSDomainSearch();
  const { id } = useParams();

  useEffect(() => {
    if (!searchText) return;

    setSearchValue(searchText);
  }, [searchText]);

  if (!searchText && status.type === SearchStatusType.Loading) {
    return <ItemsEmptyContainer />;
  }

  if (status.type === SearchStatusType.Error) {
    return <ItemsEmptyContainer>{status.error}</ItemsEmptyContainer>;
  }

  if (status.type === SearchStatusType.Loading) {
    return (
      <SearchResultsContainer>
        {' '}
        <LoadingWrapper>
          <SpinnerIcon />
        </LoadingWrapper>
      </SearchResultsContainer>
    );
  }

  return (
    <SearchResultsContainer>
      {searchText && domainDetails && domainDetails.domain && (
        <ItemsListContainer>
          <StyledRouterLink
            to={`/${config.collectionId}/${domainDetails.domain}`}
            onClick={closeDropDown}
            key={domainDetails.domain}
          >
            <ItemDetailsContainer>
              <ItemDetailsWrapper>
                <ItemDetails>
                  <MediaWrapper>
                    <PreviewDetails>
                      <NameCardBg>
                        <NameCardContainer>
                          <NameCardCollection
                            src="https://seeklogo.com/images/E/ethereum-name-service-ens-logo-B6AE963A1D-seeklogo.com.png"
                            alt="collection-logo"
                          />
                          <NameCardTitle>{`${domainDetails.domain}`}</NameCardTitle>
                        </NameCardContainer>
                      </NameCardBg>
                    </PreviewDetails>
                  </MediaWrapper>
                  <ItemNameContainer>
                    <ItemName>{`${domainDetails.domain}`}</ItemName>
                    <ItemDescription>
                      {domainDetails.registrant}
                    </ItemDescription>
                  </ItemNameContainer>
                </ItemDetails>
                <PriceDetails>
                  <div>
                    <ItemDescription>
                      Registered on:{' '}
                      {domainDetails.registrationDate.toDateString()}
                    </ItemDescription>
                  </div>
                  <div>
                    <ItemDescription>
                      Expires on:{' '}
                      {domainDetails.expiryDate.toDateString()}
                    </ItemDescription>
                  </div>
                </PriceDetails>
              </ItemDetailsWrapper>
            </ItemDetailsContainer>
          </StyledRouterLink>
        </ItemsListContainer>
      )}
    </SearchResultsContainer>
  );
};

export default DomainSearchResults;
