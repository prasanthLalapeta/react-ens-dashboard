import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, NftActionBarWrapper, ActionText } from './styles';
import { Icon } from '../icons';

/* --------------------------------------------------------------------------
 * Domain Action Bar Component
 * --------------------------------------------------------------------------*/

export const DomainActionBar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleViewCollections = () => {
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <NftActionBarWrapper>
        <ActionText onClick={handleViewCollections}>
          <Icon icon="arrow-left-circle" paddingRight />
          {t('translation:buttons.links.back')}
        </ActionText>
      </NftActionBarWrapper>
    </Container>
  );
};
