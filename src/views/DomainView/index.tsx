import { useEffect } from 'react';
import { DomainDetails } from '../../components';
import { Container, NFTDetailsWrapper } from './styles';

/* --------------------------------------------------------------------------
 * Domain View Component
 * --------------------------------------------------------------------------*/

const DomainView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <NFTDetailsWrapper>
        <DomainDetails />
      </NFTDetailsWrapper>
    </Container>
  );
};

export default DomainView;
