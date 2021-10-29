import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import './scss/style.scss';
import ErrorBoundary from './utils/helpers/ErrorBoundary';
import App from './App';

Sentry.init({
  dsn: 'https://22ae2cfbb81247d08b20cb663daa3b82@o1042666.ingest.sentry.io/6011745',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
