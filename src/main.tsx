
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';

// const root = document.getElementById('root');
// if (root) {
//   createRoot(root).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}
