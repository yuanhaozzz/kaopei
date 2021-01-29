import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import RouteGuard from './routeGuard'

const Router: FC<{}> = () => {
  return (
    <BrowserRouter basename='/koppe/'>
		<Suspense fallback={<div style={{ fontSize: 12 }}>Loading...</div>}>
			<Switch>
				<RouteGuard />
			</Switch>
		</Suspense>
    </BrowserRouter>
  )
}

export default Router;
