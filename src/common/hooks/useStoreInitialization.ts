'use client';

import { useState, useEffect } from 'react';
import { Store } from 'redux';
import { makeStore } from '../store/store';

export const useStoreInitialization = (initialReduxState: unknown): Store => {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    if (initialReduxState) {
      store.dispatch({ type: 'HYDRATE', payload: initialReduxState });
    }
  }, [initialReduxState, store]);

  return store;
};
