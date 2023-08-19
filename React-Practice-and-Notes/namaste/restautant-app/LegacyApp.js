import React from 'react';
import ReactDom from 'react-dom/client';

// React.createElement => Object => HTML Element(through rendering )
const heading = React.createElement('h1', { id: "heading" }, 'Hello React! 🚀');

// JSX (transpiled before it reaches browser's JS engine) <- Parcel <- Babel
const jsxHeading = <h1 id="heading">Hello JSX! 🚢</h1>;

// These two are same
// console.log(heading, 'heading');
// console.log(jsxHeading, 'jsxHeading');

// React Component
const title = <h1 id="heading">Hello React FC! 🏖</h1>;
const HeadingComponent = () => {
  return (
    <div id="container">
      {title}
    </div>
  );
}

const rootDom = document.getElementById('root');
if (!rootDom) throw new Error('Root DOM not found');

const root = ReactDom.createRoot(rootDom);

root.render(
  <HeadingComponent />
  // HeadingComponent()
);
