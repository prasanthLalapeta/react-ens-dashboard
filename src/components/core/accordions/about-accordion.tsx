import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Flex,
  Subtext,
} from './styles';
import useMediaQuery from '../../../hooks/use-media-query';
import { Icon } from '../../icons';

export interface AboutAccordionProps {
  data: any;
}

/* --------------------------------------------------------------------------
 * About Accordion Component
 * --------------------------------------------------------------------------*/

export const AboutAccordion = ({ data }: AboutAccordionProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  return (
    <AccordionStyle
      type="single"
      collapsible
      width={isMobileScreen ? 'small' : 'medium'}
      defaultValue="item-1"
    >
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding={isMobileScreen ? 'small' : 'medium'}
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop={isMobileScreen ? 'full' : 'borderSet'}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div>
            <Icon icon="info" paddingRight />
            <p>Domain Info</p>
          </div>
          <Icon icon="chevron-up" rotate={isAccordionOpen} />
        </AccordionTrigger>
        <AccordionContent
          padding={isMobileScreen ? 'small' : 'medium'}
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
        >
          <div>
            <Flex>
              <Subtext>Registration Address</Subtext>
              <Subtext>{data.registrant}</Subtext>
            </Flex>
            <Flex>
              <Subtext>Assigned ETH Address</Subtext>
              <Subtext>{data.assignedETHAddress}</Subtext>
            </Flex>
            <Flex>
              <Subtext>Registration Date</Subtext>
              <Subtext>
                {data.registrationDate.toDateString()}
              </Subtext>
            </Flex>
            <Flex>
              <Subtext>Expiry Date</Subtext>
              <Subtext>{data.expiryDate.toDateString()}</Subtext>
            </Flex>
          </div>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
