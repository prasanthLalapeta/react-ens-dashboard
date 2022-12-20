import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import {
  useThemeStore,
  themeActions,
  useAppDispatch,
} from '../../store';
import { LinkButton } from '../core';
import { GlobalSearch } from '../search';
import {
  Container,
  LogoContainer,
  LogoIcon,
  ByLogo,
  ActionButtonsContainer,
  MobileMenuContainer,
  NavBarWrapper,
  MobileNavbarIcons,
  BackIcon,
  MobileSearchBarActions,
  StyleRouter,
  PoweredByLogoIcon,
} from './styles';
import { Icon } from '../icons';
import { MobileNavBar } from './mobile-nav-bar';
import useMediaQuery from '../../hooks/use-media-query';

/* --------------------------------------------------------------------------
 * NavBar Component
 * --------------------------------------------------------------------------*/

export const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { pathname } = useLocation();
  const isLightTheme = theme === 'lightTheme';
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const [openMobileSearchbar, setOpenMobileSearchbar] =
    useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  const changeThemeHandler = useCallback(() => {
    dispatch(
      themeActions.setTheme(
        isLightTheme ? 'darkTheme' : 'lightTheme',
      ),
    );
  }, [isLightTheme, dispatch]);

  const revertMobileNavAnimation = () => {
    setTimeout(() => {
      setOpenMobileSearchbar(false);
      setStartAnimation(false);
    }, 700);
    setStopAnimation(true);
  };

  return (
    <Container openMobileNavbar={openMobileNavbar}>
      <NavBarWrapper>
        <StyleRouter
          to="/"
          onClick={() => {
            pathname === '/' && window.location.reload();
            setOpenMobileNavbar(false);
          }}
          startAnimation={startAnimation}
        >
          <LogoContainer>
            <LogoIcon
              src="https://searchvectorlogo.com/wp-content/uploads/2019/11/ethereum-name-service-ens-logo-vector.png"
              alt="ens-logo"
            />
            <ByLogo>by</ByLogo>
            <PoweredByLogoIcon
              src="https://logos.textgiraffe.com/logos/logo-name/Prasanth-designstyle-smoothie-m.png"
              alt="by-jelly"
            />
          </LogoContainer>
        </StyleRouter>
        {isMobileScreen && (
          <MobileSearchBarActions>
            <BackIcon
              icon="back"
              startAnimation={startAnimation}
              stopAnimation={stopAnimation}
              size="lg"
              onClick={() => {
                setTimeout(() => {
                  setOpenMobileSearchbar(false);
                  setStartAnimation(false);
                }, 700);
                setStopAnimation(true);
              }}
            />
          </MobileSearchBarActions>
        )}
        <GlobalSearch
          startAnimation={startAnimation}
          isMobileScreen={isMobileScreen}
          revertMobileNavAnimation={revertMobileNavAnimation}
        />
        {!isMobileScreen && (
          <ActionButtonsContainer>
            <LinkButton handleClick={changeThemeHandler}>
              <Icon icon={isLightTheme ? 'moon' : 'sun'} />
            </LinkButton>
          </ActionButtonsContainer>
        )}
        {isMobileScreen && (
          <MobileMenuContainer
            startAnimation={startAnimation}
            stopAnimation={stopAnimation}
          >
            <MobileNavbarIcons
              icon="search"
              size="md"
              paddingRight
              onClick={() => {
                setOpenMobileNavbar(false);
                setOpenMobileSearchbar(true);
                setStartAnimation(true);
                stopAnimation && setStopAnimation(false);
              }}
            />
            <MobileNavbarIcons
              icon={openMobileNavbar ? 'close' : 'hamburger'}
              size="lg"
              paddingLeft
              onClick={() => setOpenMobileNavbar(!openMobileNavbar)}
            />
          </MobileMenuContainer>
        )}
      </NavBarWrapper>
      {isMobileScreen && (
        <MobileNavBar
          openMobileNavbar={openMobileNavbar}
          changeThemeHandler={changeThemeHandler}
        />
      )}
    </Container>
  );
};
