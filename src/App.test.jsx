import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let root;

  await act(async () => {
    root = createRoot(div);
    root.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  await act(async () => {
    root.unmount();
  });

  document.body.removeChild(div);
});
