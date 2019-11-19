import React from 'react';
import { HookRouter } from 'hookrouter';

import HomePage from './components/HomePage';
import WhiteboardPage from './components/WhiteboardPage';

const routes: HookRouter.RouteObject = {
  '/': () => <HomePage />,
  '/b/:id': ({ id }) => <WhiteboardPage boardId={id} />,
};

export default routes;
