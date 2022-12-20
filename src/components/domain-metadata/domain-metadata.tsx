import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { notificationActions, useAppDispatch } from '../../store';
import { LinkButton } from '../core';

import {
  CollectionMetadataWrapper,
  Heading,
  Subtext,
  VerifiedIcon,
  Container,
} from './styles';
import { Icon } from '../icons';

export interface MetaDataProps {
  domain: string;
}

/* --------------------------------------------------------------------------
 * Domain Metadata Component
 * --------------------------------------------------------------------------*/

export const DomainMetaData = ({ domain }: MetaDataProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <CollectionMetadataWrapper>
        <div>
          <Heading>{domain}</Heading>
          <Subtext>
            ENS
            <VerifiedIcon icon="verified" paddingLeft />
          </Subtext>
        </div>
        <LinkButton
          handleClick={() => {
            copyToClipboard(window.location.href);
            dispatch(
              notificationActions.setSuccessMessage(
                `${t('translation:successMessages.copyToClipboard')}`,
              ),
            );
          }}
        >
          <Icon icon="share" />
        </LinkButton>
      </CollectionMetadataWrapper>
    </Container>
  );
};
