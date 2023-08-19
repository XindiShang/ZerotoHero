import React from 'react';
import ReactDom from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';

/**
 * Structure
 * Header
 * - Logo
 * - Navigation
 * Body
 * - Search
 * - Restaurant Container
 *   - Restaurant Card
 * Footer
 * - Disclaimer
 * - Contact
*/

const AppLayout = () => { 
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
}

const rootDom = document.getElementById('root');
if (!rootDom) throw new Error('Root DOM not found');

const root = ReactDom.createRoot(rootDom);

root.render(
  <AppLayout />
);
