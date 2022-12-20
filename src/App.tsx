import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { NavBar, ToastHandler } from './components';
import DashboardView from './views/DashboardView';
import DomainView from './views/DomainView';
import PageNotFound from './views/PageNotFoundView';
import { useTheme } from './hooks/use-theme';
import { portalZIndexGlobals } from './utils/styles';
import { ThemeRootElement } from './constants/common';
import { useThemeGlobals } from './hooks';
import config from './config/env';

const App = () => {
  const [theme, themeObject] = useTheme();

  useThemeGlobals(theme);
  portalZIndexGlobals();

  return (
    <div className={themeObject} id={ThemeRootElement}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={config.collectionId} />}
          />
          <Route
            path={`/${config.collectionId}`}
            element={<DashboardView />}
          >
            <Route path={`/${config.collectionId}/table-view`} />
          </Route>
          <Route
            path={`/${config.collectionId}/:id`}
            element={<DomainView />}
          />
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastHandler />
    </div>
  );
};

export default App;
