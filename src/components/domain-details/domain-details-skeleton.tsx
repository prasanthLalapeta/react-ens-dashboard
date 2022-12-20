import React from 'react';
import {
  DetailsContainer,
  PreviewContainer,
  PreviewImageSkeleton,
  AccordionSkeletion,
  Wrapper,
} from './styles';

/* --------------------------------------------------------------------------
 * Domain Details Skeleton Component
 * --------------------------------------------------------------------------*/

const DomainDetailsSkeleton = () => {
  return (
    <Wrapper>
      <PreviewContainer>
        <PreviewImageSkeleton />
      </PreviewContainer>
      <DetailsContainer>
        <AccordionSkeletion />
      </DetailsContainer>
    </Wrapper>
  );
};

export default DomainDetailsSkeleton;
