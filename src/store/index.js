import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { accidentsReducer as accidents } from './accidents';

import { usersReducer as users } from './users';
import { errorsReducer as errors } from './errors';
import { sessionReducer as session } from './session';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  session,
  accidents,

  users,
  errors,

});

export { accidentsActions } from './accidents';

export { usersActions } from './users';
export { errorsActions } from './errors';
export { sessionActions } from './session';





const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

//export const store = createStore(persistedReducer);
//export const persistor = persistStore(store);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
