/* eslint-disable react/jsx-filename-extension */
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './pages/Launch/App.js';
import Router from './Router';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'rc-time-picker/assets/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <ColorSchemeProvider>
      <NotificationsProvider>
        <ModalsProvider>
          <Router />
        </ModalsProvider>
      </NotificationsProvider>
    </ColorSchemeProvider>
  </MantineProvider>,
);
