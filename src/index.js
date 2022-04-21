import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './pages/Launch/App.js';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <ColorSchemeProvider>
      <NotificationsProvider>
       <Router />
      </NotificationsProvider>    
    </ColorSchemeProvider>
  </MantineProvider>
);