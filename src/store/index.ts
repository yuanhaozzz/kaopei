import { createContext, useContext } from 'react';
import UserInfoStore from './userInfo'

function createStores() {
	return {
	  userInfoStore: new UserInfoStore(),
	};
  }

// 实例化store
const stores = createStores();
const StoresContext = createContext(stores);

const useStores = () => useContext(StoresContext);

// 获取用户信息  
function useUserInfoStore() {
	const { userInfoStore } = useStores();
	return userInfoStore;
}

export {
	stores,
	StoresContext,
	useUserInfoStore
  };