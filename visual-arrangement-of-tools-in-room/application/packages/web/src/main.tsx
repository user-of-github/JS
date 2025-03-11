import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Toaster } from 'react-hot-toast';
import { configure } from 'mobx';
import { DatasetService } from '@/core/services/DatasetService';
import { localization } from '@/stores/Localization';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { ConfiguratorEditorPage } from '@/pages/ConfigurationEditorPage/ConfigurationEditorPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { LayoutsListPage } from '@/pages/LayoutsListPage/LayoutsListPage';
import { HomePage } from '@/pages/homePage/HomePage';
import { Routes } from '@/routes';
import { RootLayout } from './RootLayout';
import './index.css';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  disableErrorBoundaries: true
});

const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: Routes.root,
        element: <HomePage />,
        errorElement: <ErrorPage />
      },
      {
        path: Routes.configurator,
        element: <LayoutsListPage />,
        errorElement: <ErrorPage />
      },
      {
        path: Routes.configuration,
        element: <ConfiguratorEditorPage />,
        errorElement: <ErrorPage />
      },
      {
        path: Routes.about,
        element: <AboutPage />,
        errorElement: <ErrorPage />
      }
    ],
    errorElement: <ErrorPage />,
    loader: () => <LoadingSpinner />
  }
]);

const Root: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await DatasetService.init();
      await localization.init();
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingSpinner hideText />
      </div>
    );
  }

  return (
    <IntlProvider locale={localization.locale} messages={localization.messages}>
      <RouterProvider router={router} />
      <Toaster containerClassName="select-none" />
    </IntlProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<Root />);
