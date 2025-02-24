import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

/* ATTENTION: this is package for React 19 Compatibility from https://ant.design/docs/react/v5-for-19 */
import '@ant-design/v5-patch-for-react-19';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
