import { CardWrapper, SkeletonLarge, SkeletonSmall } from './styles';

/* --------------------------------------------------------------------------
 * Card Skeleton Component
 * --------------------------------------------------------------------------*/

export const CardSkeleton = () => (
  <CardWrapper>
    <SkeletonLarge />
    <SkeletonSmall />
    <SkeletonSmall />
  </CardWrapper>
);
