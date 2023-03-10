import * as ToastPrimitive from '@radix-ui/react-toast';
import { styled, keyframes } from '../../../stitches.config';
import { Icon } from '../../icons';

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const slideIn = keyframes({
  from: {
    transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))`,
  },
  to: {
    transform: 'translateX(0)',
  },
});

const swipeOut = keyframes({
  from: {
    transform: 'translateX(var(--radix-toast-swipe-end-x))',
  },
  to: {
    transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))`,
  },
});

export const ToastProvider = styled(ToastPrimitive.Provider, {});

export const ToastViewport = styled(ToastPrimitive.Viewport, {
  position: 'fixed',
  top: 65,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,

  '@sm': {
    top: '80px',
    width: '100%',
    padding: '25px 0px',
    flexDirection: 'unset',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export const Toast = styled(ToastPrimitive.Root, {
  backgroundColor: '$toastBackground',
  borderRadius: '20px',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  padding: 15,
  display: 'flex',
  gap: 15,
  justifyContent: 'space-between',
  alignItems: 'center',

  '@sm': {
    width: '85%',
    marginBottom: '25px',
  },

  variants: {
    state: {
      success: {
        color: '$success',

        '@sm': {
          background: '$success',
          color: '#ffffff',
        },
      },
      error: {
        color: '$error',

        '@sm': {
          background: '$error',
          color: '#ffffff',
        },
      },
    },
  },

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in forwards`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out forwards`,
    },
  },
});

export const ToastDescription = styled(ToastPrimitive.Description, {
  gridArea: 'description',
  display: 'flex',
  alignItems: 'base-line',
  justifyContent: 'center',
  fontWeight: 'bold',
});

export const ToastDescriptionText = styled('p', {
  margin: '0px',
});

export const StyledIconWrapper = styled('div', {
  variants: {
    state: {
      success: {
        '@sm': {
          color: '$success',
        },
      },
      error: {
        '@sm': {
          color: '$error',
        },
      },
    },
  },
});

export const StyledIcon = styled(Icon, {
  cursor: 'pointer',

  '@sm': {
    top: '-45px',
    right: '-15px',
    position: 'relative',
    borderRadius: '100%',
    background: 'white',
    boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.16)',
  },
});
