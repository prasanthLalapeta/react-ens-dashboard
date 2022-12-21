/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  CardContainer,
  CardWrapper,
  NFTCardOptions,
  Flex,
  NftDataHeader,
  ActionDetails,
  NftDataText,
  RouterLink,
  DateHeader,
} from './styles';
import { SkeletonBox } from '../../skeleton';
import { NameCard } from './name-card';
import { NameTooltip } from '../../tooltip';
import config from '../../../../config/env';
import { reverselookupProvider } from '../../../../utils/ens';

export type DomainCardProps = {
  data: any;
  registeredUserAddress: string;
};

/* --------------------------------------------------------------------------
 * Domain card Component
 * --------------------------------------------------------------------------*/

export const DomainCard = React.memo(
  ({ data, registeredUserAddress }: DomainCardProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [registeredUserDomain, setRegisteredUserDomain] =
      useState('');
    const [loadingRegisteredDomain, setLoadingRegisteredDomain] =
      useState(true);

    useEffect(() => {
      const reverseLookup = async () => {
        setLoadingRegisteredDomain(true);
        const registeredUser =
          await reverselookupProvider.lookupAddress(
            registeredUserAddress,
          );
        setLoadingRegisteredDomain(false);
        setRegisteredUserDomain(
          registeredUser || registeredUserAddress,
        );
      };

      reverseLookup();

      return () => {
        // this now gets called when the component unmounts
      };
    }, [registeredUserAddress]);

    return (
      <CardContainer
        ref={containerRef}
        role="link"
        tabIndex={0}
        onKeyDown={(event: any) => {
          // Keyboard accessibility
          if (event.keyCode === 13)
            navigate(`/${config.collectionId}/${data.domain}`);
        }}
      >
        <CardWrapper>
          <RouterLink
            to={`/${config.collectionId}/${data.domain}`}
            className="card-router"
            tabIndex={-1}
          >
            <NameCard
              containerRef={containerRef}
              name={data?.domain}
            />
            <Flex>
              <NftDataHeader>Registrant Address</NftDataHeader>
            </Flex>
            <Flex>
              {loadingRegisteredDomain && (
                <SkeletonBox size="small" />
              )}
              <NftDataText>
                <NameTooltip name={registeredUserDomain} />
              </NftDataText>
            </Flex>
            <Flex>
              <NftDataHeader>Assigned ETH address</NftDataHeader>
            </Flex>
            <Flex>
              <NftDataText>
                <NameTooltip name={data.assignedETHAddress} />
              </NftDataText>
            </Flex>
          </RouterLink>
          <NFTCardOptions onClick={(e) => e.stopPropagation()}>
            <ActionDetails>
              <Flex>
                <NftDataHeader>
                  <DateHeader>Registered:</DateHeader>{' '}
                  {data.registrationDate.toDateString()}
                </NftDataHeader>
              </Flex>
              <Flex>
                <NftDataHeader>
                  <DateHeader>Expires:</DateHeader>
                  {data.expiryDate.toDateString()}
                </NftDataHeader>
              </Flex>
            </ActionDetails>
          </NFTCardOptions>
        </CardWrapper>
      </CardContainer>
    );
  },
);
