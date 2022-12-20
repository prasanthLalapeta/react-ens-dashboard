import React from 'react';
import { DomainsListTabs } from '../../components';
import { Container, DashboardContainer } from './styles';

/* --------------------------------------------------------------------------
 * Dashboard View Component
 * --------------------------------------------------------------------------*/

const DashboardView = () => {
  return (
    <Container>
      <DashboardContainer>
        <DomainsListTabs />
      </DashboardContainer>
    </Container>
  );
};

export default DashboardView;
