import {
  writable,
} from 'svelte/store';

const userInfo = {};

const createUserInfoStore = () => {
  const {
    subscribe,
    set,
    update,
  } = writable(userInfo);

  return {
    subscribe,
    udpateUserInfo: (userInfo) => update((state) => {
      console.debug('userInfoStore.udpateUserInfo');

      return {
        ...state,
        ...userInfo,
      };
    }),
  };
};

export const userInfoStore = createUserInfoStore();