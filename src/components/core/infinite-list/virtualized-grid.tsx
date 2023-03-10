import throttle from 'lodash.throttle';
import { Fragment, useEffect, useRef, useState } from 'react';
import useVirtual from 'react-cool-virtual';
import useMediaQuery from '../../../hooks/use-media-query';
import { CardListContainer } from './styles';

const DefaultProps = {
  width: 210,
  mediumMobileWidth: 185,
  smallMobileWidth: 360,
  height: 348,
  smallMobileHeight: 450,
  headerOffset: 76,
  columns: 3,
  scrollThreshold: 348,
  smallScrollThreshold: 450,
  rowSpacing: 1.06,
  smallMobileRowSpacing: 1.16,
  padding: 15,
  throttlingInterval: 300,
};

export type VirtualizedGridProps<T extends object> = Partial<
  typeof DefaultProps
> & {
  items: T[];
  ItemRenderer: React.VFC<T>;
  Skeleton: React.VFC;
  loadingMore?: boolean;
};

/* --------------------------------------------------------------------------
 * Virtualized Grid Component
 * --------------------------------------------------------------------------*/

export const VirtualizedGrid = <T extends object>({
  items,
  ItemRenderer,
  loadingMore,
  Skeleton,
  width = DefaultProps.width,
  mediumMobileWidth = DefaultProps.mediumMobileWidth,
  height = DefaultProps.height,
  smallMobileHeight = DefaultProps.smallMobileHeight,
  headerOffset = DefaultProps.headerOffset,
  columns = DefaultProps.columns,
  scrollThreshold: fullScrollThreshold = DefaultProps.scrollThreshold,
  smallScrollThreshold = DefaultProps.smallScrollThreshold,
  rowSpacing: fullRowSpacing = DefaultProps.rowSpacing,
  smallMobileRowSpacing = DefaultProps.smallMobileRowSpacing,
  padding = DefaultProps.padding,
  throttlingInterval = DefaultProps.throttlingInterval,
}: VirtualizedGridProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [colItems, setColItems] = useState(columns);
  const [screenWidth, setScreenWidth] = useState<number>();
  const isMediumMobileScreen = useMediaQuery('(max-width: 850px)');
  const isSmallMobileScreen = useMediaQuery('(max-width: 400px)');
  const colItemWidth = (() => {
    if (isMediumMobileScreen) return mediumMobileWidth;
    return width;
  })();
  const rowSpacing = isSmallMobileScreen
    ? smallMobileRowSpacing
    : fullRowSpacing;
  const scrollThreshold = isSmallMobileScreen
    ? smallScrollThreshold
    : fullScrollThreshold;
  const [spacingCoefficient, setSpacingCoefficient] =
    useState(rowSpacing);

  const row = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount:
      Math.ceil(items.length / colItems) + (loadingMore ? 2 : 0),
    itemSize: isSmallMobileScreen ? smallMobileHeight : height,
  });

  const col = useVirtual<HTMLDivElement, HTMLDivElement>({
    horizontal: true,
    itemCount: colItems,
    itemSize: colItemWidth,
  });

  // Calculate the total amount of columns and spacing
  useEffect(() => {
    const wrapperReference = wrapperRef.current;
    if (!wrapperReference || colItemWidth <= 0) return;

    // Event listener for column items
    const resizeListener = () => {
      // Calculate the possible amount of columns
      const wrapperWidth =
        wrapperReference.getBoundingClientRect().width;
      setScreenWidth(wrapperWidth);
      let newColItems = Math.floor(wrapperWidth / colItemWidth);

      // Calculate the column spacing coefficient
      const getSpacingCoefficient = () =>
        (wrapperWidth - colItemWidth * newColItems) /
        Math.max(newColItems - 1, 1) /
        colItemWidth;

      let newSpacingCoefficient = getSpacingCoefficient();

      // Decrease the column number if the space between columns is too small
      if (
        (newSpacingCoefficient * wrapperWidth) / newColItems <
        (isMediumMobileScreen || isSmallMobileScreen ? 0 : padding)
      ) {
        newColItems -= 1;
        newSpacingCoefficient = getSpacingCoefficient();
      }

      // Update column items state
      setColItems(newColItems);
      setSpacingCoefficient(newSpacingCoefficient + 1);
    };
    resizeListener();

    // Add throttled listener to window resize
    const resizeListenerThrottled = throttle(
      resizeListener,
      throttlingInterval,
    );
    window.addEventListener('resize', resizeListenerThrottled);
    return () => {
      window.removeEventListener('resize', resizeListenerThrottled);
    };
  }, [wrapperRef, colItemWidth, throttlingInterval, padding]);

  useEffect(() => {
    const scrollerReference = row.outerRef.current;
    const wrapperReference = wrapperRef.current;
    const innerReference = row.innerRef.current;
    if (!scrollerReference || !wrapperReference || !innerReference)
      return;

    // Set scroller height to cover the view
    scrollerReference.style.height = `${
      window.innerHeight - headerOffset
    }px`;

    // Calculate the scroll distance between the
    // top of the page and the top of the list
    const initialTop = scrollerReference.getBoundingClientRect().top;
    const topFullDistance =
      initialTop + window.scrollY - headerOffset - padding;

    // Event listener to update scroll position
    const updateListener = () => {
      // Window scroll applicable to scroller
      const windowRelativeScroll =
        document.documentElement.scrollHeight +
        scrollThreshold / 2 -
        topFullDistance;

      // Calculate the new scroller scroll position
      const scrollCoefficient =
        scrollerReference.scrollHeight / windowRelativeScroll;
      const currentWindowRelativeScroll =
        window.scrollY - topFullDistance;
      const scrollerY = Math.max(
        currentWindowRelativeScroll * scrollCoefficient,
        0,
      );

      // Apply the new scroller scroll position
      scrollerReference.scrollTo(0, scrollerY);

      // New offset of the scroller inside the wrapper
      const topThreshold = scrollThreshold / 2;
      const realOffset = Math.max(
        currentWindowRelativeScroll - topThreshold,
        0,
      );
      const maximalOffset =
        wrapperReference.getBoundingClientRect().height -
        scrollerReference.offsetHeight;
      const offsetInWrapper = Math.min(realOffset, maximalOffset);

      // Apply the new offset inside the wrappers
      scrollerReference.style.transform = `translateY(${offsetInWrapper}px)`;
    };
    updateListener();
    // Add scroll event listener
    window.addEventListener('scroll', updateListener);

    // Add throttled update for resize events
    const updateListenerThrottled = throttle(
      updateListener,
      throttlingInterval,
    );
    const resizeObserver = new ResizeObserver(() => {
      wrapperReference.style.height = `${scrollerReference.scrollHeight}px`;
      updateListenerThrottled();
    });
    resizeObserver.observe(innerReference);
    resizeObserver.observe(scrollerReference);

    // Clear all event listeners on unmount
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateListener);
    };
  }, [
    row.outerRef,
    row.innerRef,
    wrapperRef,
    scrollThreshold,
    throttlingInterval,
    headerOffset,
    padding,
  ]);

  const getItemIndex = (rowIndex: number, colIndex: number) =>
    rowIndex * colItems + colIndex;

  return (
    <CardListContainer ref={wrapperRef}>
      <div
        style={{
          width: `100%`,
          margin: `-${padding}px`,
          paddingTop: `${padding}px`,
          paddingLeft: `${padding}px`,
          paddingRight: `${padding}px`,
          paddingBottom: `${scrollThreshold}px`,
          overflow: 'hidden',
        }}
        ref={(el) => {
          row.outerRef.current = el;
          col.outerRef.current = el;
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
          ref={(el) => {
            row.innerRef.current = el;
            col.innerRef.current = el;
          }}
        >
          {row.items.map((rowItem) => (
            <Fragment key={rowItem.index}>
              {col.items.map((colItem) => (
                <div
                  key={colItem.index}
                  style={{
                    position: 'absolute',
                    height: `${rowItem.size}px`,
                    width: `${
                      isSmallMobileScreen ? screenWidth : colItem.size
                    }px`,
                    transform: `translateX(${
                      colItem.start * spacingCoefficient
                    }px) translateY(${rowItem.start * rowSpacing}px)`,
                  }}
                >
                  {items[
                    getItemIndex(rowItem.index, colItem.index)
                  ] && (
                    <ItemRenderer
                      {...items[
                        getItemIndex(rowItem.index, colItem.index)
                      ]}
                    />
                  )}
                  {!items[
                    getItemIndex(rowItem.index, colItem.index)
                  ] &&
                    loadingMore && <Skeleton />}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </CardListContainer>
  );
};
