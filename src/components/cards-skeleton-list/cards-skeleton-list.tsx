import { CardSkeleton } from '../core';

const NftListData = Array(10)
  .fill('')
  .map((_, id) => ({ id: `${id}` }));

/* --------------------------------------------------------------------------
 * Cards Skeleton Component
 * --------------------------------------------------------------------------*/

export const CardsSkeletonList = () => (
  <>
    {NftListData.map((item) => (
      <CardSkeleton key={item.id} />
    ))}
  </>
);
