import { Link } from 'react-router-dom';
import { styled, keyframes } from '../../../../stitches.config';
import gradientBg from '../../../../assets/gradient-card-bg.svg';

export const CardContainer = styled('div', {
  transition: 'all 0.2s ease-in-out',
});

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',
  borderRadius: '14px',
  width: '100%',
  padding: '10px 15px',
  overflow: 'hidden',
  minWidth: '210px',

  transition: 'all 0.2s ease-in-out',
  boxShadow: '$default',
  '&:hover': {
    boxShadow: '$active',
  },

  '@md': {
    minWidth: 'unset',
  },
});

export const MediaWrapper = styled('div', {
  position: 'relative',
  height: '150px',
  margin: '10px -15px',

  '@xs': {
    height: '356px',
  },
});

export const PreviewDetails = styled('div', {
  minHeight: '150px',
  width: '100%',
  height: '100%',
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const OwnedCardText = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#777E90',
  margin: '0',
  height: '15px',
});

export const NftDataText = styled('span', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  marginTop: '3px',
  marginBottom: '5px',
  color: '$mainTextColor',
  display: 'flex',
  alignItems: 'center',

  '& img': {
    marginRight: '3px',
    width: '15px',
  },

  '@xs': {
    fontSize: '16px',
  },
});

export const NftDataHeader = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  color: '$nftCardName',
});

export const DateHeader = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '10px',
  color: '$mainTextColor',
  marginRight: '5px',
});

export const ActionDetails = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  color: '$nftCardName',
  display: 'flex',
  alignItems: 'left',
  flexDirection: 'column',

  '& b': {
    color: '$mainTextColor',
  },
});

export const ActionText = styled('span', {
  marginRight: '5px',

  '@md': {
    fontSize: '12px',
    marginRight: '2px',
  },

  '@xs': {
    fontSize: '14px',
  },
});

export const NFTCardOptions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$nftCardSubSection',
  padding: '5px 15px',

  minHeight: '28px',
  margin: '10px -15px -10px -15px',

  '& p': {
    margin: '0',
  },
});

export const HoverMessageContainer = styled('span', {
  position: 'absolute',
  bottom: '2px',
  left: '2px',
  right: '2px',
  borderRadius: '4px',

  textAlign: 'center',
  fontSize: '10px',

  backgroundColor: '$backgroundColor',
  color: '$mainTextColor',
});

export const RouterLink = styled(Link, {
  variants: {
    previewCard: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
});

export const NameCardBg = styled('div', {
  height: '100%',
  margin: '0px 10px',
  borderRadius: '14px',
  backgroundImage: `url(${gradientBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

export const NameCardContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const NameCardCollection = styled('img', {
  width: '100%',
  maxWidth: '45px',
  padding: '18px',
});

export const NameCardTitle = styled('div', {
  fontSize: '20px',
  fontWeight: '600',
  textAlign: 'left',
  padding: '18px',
  color: '#000',
});
