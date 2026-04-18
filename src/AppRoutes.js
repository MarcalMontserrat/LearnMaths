import { Home } from './features/practice/Home';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '*',
    element: <Home />
  }
];

export default AppRoutes;
