import React, { FC, Fragment, useEffect } from 'react';
import { setRem } from './utils/helper';
import Router from './route';
import { Provider } from 'mobx-react';
import {stores, StoresContext} from '@/store';
import Loading from '@/components/loading';
import WxSDK from '@/components/wxsdk'
import '@/assets/css/reset.less'
import '@/assets/css/component.less'

const App: FC = (props) => {

	setRem(window);
	return (
		<Provider store={stores}>
			<StoresContext.Provider value={stores}>
				<Router {...props} />
				{/* loading */}
				<div className='common-loading-wrapper'>
					<Loading />
				</div>
				{/* sdk */}
				<WxSDK />
			</StoresContext.Provider>
		</Provider>
	)
}

export default App;
