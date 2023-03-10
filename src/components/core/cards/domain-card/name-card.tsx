import { useEffect, useState, useRef } from 'react';
import {
  MediaWrapper,
  PreviewDetails,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import { NameTooltip } from '../../tooltip';

export type NameCardProps = {
  previewCard?: boolean;
  name?: string;
  containerRef: React.RefObject<HTMLDivElement>;
};

/* --------------------------------------------------------------------------
 * Name card Component
 * --------------------------------------------------------------------------*/

export const NameCard = ({
  name = '',
  containerRef,
  previewCard,
}: NameCardProps): JSX.Element => {
  const [startedHovering, setStartedHovering] = useState(false);
  let triggerTimeout = useRef<NodeJS.Timeout>();

  const resetTimeout = () => {
    clearTimeout(triggerTimeout.current);
    triggerTimeout.current = undefined;
  };

  const hoverInCallback = () => {
    setStartedHovering(true);
  };

  const hoverOutCallback = () => {
    setStartedHovering(false);
    resetTimeout();
  };

  useEffect(() => {
    if (!previewCard && containerRef.current) {
      containerRef.current.addEventListener(
        'mouseenter',
        hoverInCallback,
      );
      containerRef.current.addEventListener(
        'mouseleave',
        hoverOutCallback,
      );

      return () => {
        resetTimeout();
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            'mouseenter',
            hoverInCallback,
          );
          containerRef.current.removeEventListener(
            'mouseleave',
            hoverOutCallback,
          );
        }
      };
    }
  }, [setStartedHovering, containerRef, previewCard, location]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (startedHovering) {
      containerRef.current.style.transform = 'scale(1.03)';
    } else {
      containerRef.current.style.transform = '';
    }
  }, [previewCard, startedHovering, containerRef]);

  return (
    <MediaWrapper>
      <PreviewDetails>
        <NameCardBg>
          <NameCardContainer>
            <NameCardCollection
              src="https://seeklogo.com/images/E/ethereum-name-service-ens-logo-B6AE963A1D-seeklogo.com.png"
              alt="ens-logo"
            />
            <NameCardTitle>
              <NameTooltip name={name} />
            </NameCardTitle>
          </NameCardContainer>
        </NameCardBg>
      </PreviewDetails>
    </MediaWrapper>
  );
};
